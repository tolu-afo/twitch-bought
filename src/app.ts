import * as tmi from 'tmi.js';
import * as express from 'express';
import authConfig from './auth.config';
import { AppDataSource } from './data-source';
import { Poll } from './entity/Poll';
import StateManager from './StateManager';

// step 1. Add Express Server - done
// step 3. add active poll state, and reconfigure poll command
    // stop new polls from coming if their is an active poll - done
    // vote for polls with just a number - done
// step 3. add docker to deploy project
// step 4. add nginx to run project
// step 5. deploy?

// typeORM Client
AppDataSource.initialize().then(async () => {
    const state = new StateManager()
    state.add('active_poll', null);

    // express client
    const app = express();

    app.listen(3000, () => {
        console.log("Express Server listening on Port 3000");
    })

    app.get("/", (req, res) => {
        res.sendStatus(200);
    })

    // twitch bot client
    const client = new tmi.Client({
        options: { debug: true },
        identity: {
            username: 'toluafo',
            password: `oauth:${authConfig.oauth_token}`
        },
        channels: ['toluafo']
    });


    client.connect().catch((err)=>{
        console.log(err);
    });
    
    client.on('message', async (channel, tags, message, self) => {
        if(self) return;
        const msg = message.toLowerCase();
        
        const getWinner = (poll: Poll)=> {
            if (poll.count1 > poll.count2){
                return poll.option1
            }
            else if (poll.count2 > poll.count2){
                return poll.option2
            }
            else{
                return "It's a Tie!"
            }
        }

        const createPoll = async (question: string, opt1:string, opt2:string) => {
            let poll = new Poll();
            poll.question = question;
            poll.option1 = opt1;
            poll.option2 = opt2;
            
            await AppDataSource.manager.save(poll)
            const pollId = poll.id;
            state.add('active_poll', poll.id);
            client.say(channel, `New Poll just started!!! Poll #${poll.id} ${question}, press 1 for ${opt1}, and 2 for ${opt2}`);
            return pollId;
        }

        const votePoll = async (vote:number) => {
            // assumes there is an active poll
            const pollId = state.get('active_poll');

            const poll = await AppDataSource.getRepository(Poll).findOneBy({id: parseInt(pollId)});
            if (poll){
                if ( vote === 1 ) {
                    // the user voted for the first option
                    poll.count1 = poll.count1 + 1;
                } else if ( vote === 2 ) {
                    poll.count2 = poll.count2 + 1;
                }
                await AppDataSource.manager.save(poll)
            }

        }

        const getTally = async () => {
            const pollId = state.get('active_poll');
            const poll = await AppDataSource.getRepository(Poll).findOneBy({id: parseInt(pollId)});
            if (poll){
                client.say(channel, `The ${poll.question} Poll vote is currently at ${poll.option1}:${poll.count1} and ${poll.option2}:${poll.count2}`);
            }
        }

        if(state.get('active_poll') && (msg === '1' || msg === '2')){
            // there is an active poll
            votePoll(parseInt(msg));
        }

        const split_msg = msg.split(' ')
        if (split_msg.length > 1){
            if (split_msg[0] === '!poll'){
                const [_, question, opt1, opt2] = msg.split(' | ');
                
                const pollId = await createPoll(question, opt1, opt2);

                setTimeout(async () => {
                    const poll = await AppDataSource.getRepository(Poll).findOneBy({id: pollId });
                    client.say(channel, `Poll is over! The winner is, ${getWinner(poll)}`)
                    poll.is_over = true;
                    state.add('active_poll', null)
                    await AppDataSource.manager.save(poll);
                }, 1000*60*5)
            }
        }
        else{
            switch(msg) {
                case '!help': {
                    client.say(channel, `commands are; !help, !hello, !donate, !goal, !social, !poll | <question> | <option1> | <option2>`)
                    break;
                }
                case '!hello': {
                    client.say(channel, `@${tags.username}, what's up!`);
                    break;
                }
                case '!donate': {
                    client.say(channel, `Click here to donate! https://streamlabs.com/toluafo/tip`);
                    break;
                }
                case '!goal': {
                    client.say(channel, `Our Current stream goal is 150 Followers!`);
                    break;
                }
                case '!social': {
                    client.say(channel, `Tolu's Socials: IG: www.instagram.com/toluafo_, twitter: www.twitter.com/toluafo_, youtube: www.youtube.com/@ToluAfo, github: www.github.com/tolu-afo`);
                    break;
                }
                case '!cache': {
                    state.add('user', tags.username);
                    break;
                }
                case '!whosecached': {
                    const cached = state.get('user');
                    client.say(channel, `The last user to be cached was @${cached}`)
                    break;
                }
                case `!tally`: {
                    if (state.get('active_poll')){
                        await getTally();
                    }else{
                        client.say(channel, `There is currently no active poll`);
                    }

                }
                default: {
                    break;
                }
            }
        }
    });

})

