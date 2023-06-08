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
var tmi = require("tmi.js");
var express = require("express");
var auth_config_1 = require("./auth.config");
var data_source_1 = require("./data-source");
var Poll_1 = require("./entity/Poll");
var StateManager_1 = require("./StateManager");
// step 1. Add Express Server - done
// step 3. add active poll state, and reconfigure poll command - done
// stop new polls from coming if their is an active poll - done
// vote for polls with just a number - done
// step 3. add docker to deploy project
// step 4. add nginx to run project
// step 5. deploy?
// typeORM Client
data_source_1.AppDataSource.initialize().then(function () { return __awaiter(void 0, void 0, void 0, function () {
    var state, app, client;
    return __generator(this, function (_a) {
        state = new StateManager_1.default();
        state.add('active_poll', null);
        app = express();
        app.listen(3000, function () {
            console.log("Express Server listening on Port 3000");
        });
        app.get("/", function (req, res) {
            res.sendStatus(200);
        });
        client = new tmi.Client({
            options: { debug: auth_config_1.default.debug },
            identity: {
                username: 'bongogpt',
                password: "oauth:".concat(auth_config_1.default.oauth_token)
            },
            channels: ['toluafo']
        });
        client.connect().catch(function (err) {
            console.log(err);
        });
        client.on('message', function (channel, tags, message, self) { return __awaiter(void 0, void 0, void 0, function () {
            var msg, getWinner, createPoll, votePoll, getTally, split_msg, _a, _, question, opt1, opt2, pollId_1, _b, cached;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (self)
                            return [2 /*return*/];
                        msg = message.toLowerCase();
                        getWinner = function (poll) {
                            // returns winner of poll winner
                            if (poll.count1 > poll.count2) {
                                return poll.option1;
                            }
                            else if (poll.count2 > poll.count2) {
                                return poll.option2;
                            }
                            else {
                                return "It's a Tie!";
                            }
                        };
                        createPoll = function (question, opt1, opt2) { return __awaiter(void 0, void 0, void 0, function () {
                            var poll, pollId;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        poll = new Poll_1.Poll();
                                        poll.question = question;
                                        poll.option1 = opt1;
                                        poll.option2 = opt2;
                                        return [4 /*yield*/, data_source_1.AppDataSource.manager.save(poll)];
                                    case 1:
                                        _a.sent();
                                        pollId = poll.id;
                                        state.add('active_poll', poll.id);
                                        client.say(channel, "New Poll just started!!! Poll #".concat(poll.id, " ").concat(question, ", press 1 for ").concat(opt1, ", and 2 for ").concat(opt2));
                                        return [2 /*return*/, pollId];
                                }
                            });
                        }); };
                        votePoll = function (vote) { return __awaiter(void 0, void 0, void 0, function () {
                            var pollId, poll;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        pollId = state.get('active_poll');
                                        return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Poll_1.Poll).findOneBy({ id: parseInt(pollId) })];
                                    case 1:
                                        poll = _a.sent();
                                        if (!poll) return [3 /*break*/, 3];
                                        if (vote === 1) {
                                            // the user voted for the first option
                                            poll.count1 = poll.count1 + 1;
                                        }
                                        else if (vote === 2) {
                                            poll.count2 = poll.count2 + 1;
                                        }
                                        return [4 /*yield*/, data_source_1.AppDataSource.manager.save(poll)];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); };
                        getTally = function () { return __awaiter(void 0, void 0, void 0, function () {
                            var pollId, poll;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        pollId = state.get('active_poll');
                                        return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Poll_1.Poll).findOneBy({ id: parseInt(pollId) })];
                                    case 1:
                                        poll = _a.sent();
                                        if (poll) {
                                            client.say(channel, "The ".concat(poll.question, " Poll vote is currently at ").concat(poll.option1, ":").concat(poll.count1, " and ").concat(poll.option2, ":").concat(poll.count2));
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        if (state.get('active_poll') && (msg === '1' || msg === '2')) {
                            // there is an active poll
                            votePoll(parseInt(msg));
                        }
                        split_msg = msg.split(' ');
                        if (!(split_msg.length > 1)) return [3 /*break*/, 3];
                        if (!(split_msg[0] === '!poll')) return [3 /*break*/, 2];
                        _a = msg.split(' | '), _ = _a[0], question = _a[1], opt1 = _a[2], opt2 = _a[3];
                        return [4 /*yield*/, createPoll(question, opt1, opt2)];
                    case 1:
                        pollId_1 = _c.sent();
                        setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                            var poll;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Poll_1.Poll).findOneBy({ id: pollId_1 })];
                                    case 1:
                                        poll = _a.sent();
                                        client.say(channel, "Poll is over! The winner is, ".concat(getWinner(poll)));
                                        poll.is_over = true;
                                        state.add('active_poll', null);
                                        return [4 /*yield*/, data_source_1.AppDataSource.manager.save(poll)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 1000 * 60 * 5);
                        _c.label = 2;
                    case 2: return [3 /*break*/, 17];
                    case 3:
                        _b = msg;
                        switch (_b) {
                            case '!help': return [3 /*break*/, 4];
                            case '!hello': return [3 /*break*/, 5];
                            case '!donate': return [3 /*break*/, 6];
                            case '!discord': return [3 /*break*/, 7];
                            case '!projects': return [3 /*break*/, 8];
                            case '!goal': return [3 /*break*/, 9];
                            case '!social': return [3 /*break*/, 10];
                            case '!cache': return [3 /*break*/, 11];
                            case '!whosecached': return [3 /*break*/, 12];
                            case "!tally": return [3 /*break*/, 13];
                        }
                        return [3 /*break*/, 16];
                    case 4:
                        {
                            client.say(channel, "commands are; !help, !hello, !donate, !goal, !social, !poll | <question> | <option1> | <option2>");
                            return [3 /*break*/, 17];
                        }
                        _c.label = 5;
                    case 5:
                        {
                            client.say(channel, "@".concat(tags.username, ", what's up!"));
                            return [3 /*break*/, 17];
                        }
                        _c.label = 6;
                    case 6:
                        {
                            client.say(channel, "Click here to donate! https://streamlabs.com/toluafo/tip");
                            return [3 /*break*/, 17];
                        }
                        _c.label = 7;
                    case 7:
                        {
                            client.say(channel, "Click here to join our Discord! https://discord.gg/9Gsxy5h6");
                            return [3 /*break*/, 17];
                        }
                        _c.label = 8;
                    case 8:
                        {
                            client.say(channel, "Click here to see our projects! https://github.com/tolu-afo?tab=repositories ");
                            return [3 /*break*/, 17];
                        }
                        _c.label = 9;
                    case 9:
                        {
                            client.say(channel, "Our Current stream goal is 150 Followers!");
                            return [3 /*break*/, 17];
                        }
                        _c.label = 10;
                    case 10:
                        {
                            client.say(channel, "Tolu's Socials: IG: www.instagram.com/toluafo_, twitter: www.twitter.com/toluafo_, youtube: www.youtube.com/@ToluAfo, github: www.github.com/tolu-afo");
                            return [3 /*break*/, 17];
                        }
                        _c.label = 11;
                    case 11:
                        {
                            state.add('user', tags.username);
                            return [3 /*break*/, 17];
                        }
                        _c.label = 12;
                    case 12:
                        {
                            cached = state.get('user');
                            client.say(channel, "The last user to be cached was @".concat(cached));
                            return [3 /*break*/, 17];
                        }
                        _c.label = 13;
                    case 13:
                        if (!state.get('active_poll')) return [3 /*break*/, 15];
                        return [4 /*yield*/, getTally()];
                    case 14:
                        _c.sent();
                        return [3 /*break*/, 16];
                    case 15:
                        client.say(channel, "There is currently no active poll");
                        _c.label = 16;
                    case 16:
                        {
                            return [3 /*break*/, 17];
                        }
                        _c.label = 17;
                    case 17: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=app.js.map