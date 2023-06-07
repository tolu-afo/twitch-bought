"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// don't forget to comment your code!!!
var tmi_js_1 = require("tmi.js");
var auth_config_1 = require("./auth.config");
var data_source_1 = require("./data-source");
var Poll_1 = require("./entity/Poll");
data_source_1.AppDataSource.initialize().then(function () { return __awaiter(void 0, void 0, void 0, function () {
    var client;
    return __generator(this, function (_a) {
        client = new tmi_js_1.default.Client({
            options: { debug: true },
            identity: {
                username: 'toluafo',
                password: "oauth:".concat(auth_config_1.default.oauth_token)
            },
            channels: ['toluafo']
        });
        client.connect().catch(function (err) {
            console.log(err);
        });
        client.on('message', function (channel, tags, message, self) {
            if (self)
                return;
            var msg = message.toLowerCase();
            if (msg.split(' ')[0] === '!poll') {
                var _a = msg.split('|'), _ = _a[0], question = _a[1], opt1 = _a[2], opt2 = _a[3];
                var poll_1 = new Poll_1.Poll();
                poll_1.question = question;
                client.say(channel, "New Poll just started!!! ".concat(question, ", press 1 for ").concat(opt1, ", and 2 for ").concat(opt2));
                setTimeout(function () {
                    client.say(channel, "Poll Ended; Winner: ".concat(poll_1.getWinner()));
                });
            }
            switch (msg) {
                case '!help': {
                    client.say(channel, "commands are; !help, !hello, !donate, !goal, !social, !poll | <question> | <option1> | <option2>");
                    break;
                }
                case '!hello': {
                    client.say(channel, "@".concat(tags.username, ", what's up!"));
                    break;
                }
                case '!donate': {
                    client.say(channel, "Click here to donate! https://streamlabs.com/toluafo/tip");
                    break;
                }
                case '!goal': {
                    client.say(channel, "Our Current stream goal is 150 Followers!");
                    break;
                }
                case '!social': {
                    client.say(channel, "Tolu's Socials: IG: www.instagram.com/toluafo_, twitter: www.twitter.com/toluafo_, youtube: www.youtube.com/@ToluAfo, github: www.github.com/tolu-afo");
                    break;
                }
                case '!vote': {
                    // cmd 1 or 2
                    // example: !vote 1 or !vote 2
                }
                default: {
                    break;
                }
            }
        });
        return [2 /*return*/];
    });
}); });
// class Poll {
//     opt1: string;
//     opt2: string;
//     cnt1: number;
//     cnt2: number;
//     constructor(opt1: string, opt2: string) {
//         this.opt1 = opt1;
//         this.opt2 = opt2;
//         this.cnt1 = 0;
//         this.cnt2 = 0;
//     }
//     getWinner() : string {
//         if (this.cnt1 > this.cnt2){
//             return this.opt1
//         }
//         else if (this.cnt2 > this.cnt2){
//             return this.opt2
//         }
//         else{
//             return this.opt2
//         }
//     }
//     voteOpt1() {
//         this.cnt1 ++;
//     }
//     voteOpt2() {
//         this.cnt2 ++;
//     }
// }
// !Donate, !Goal, !Social, !Projects
//# sourceMappingURL=app.js.map