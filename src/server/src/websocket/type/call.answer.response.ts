import {ClientsIdPair} from "./clients.id.pair";
import {IncomeCallAnswerStatus} from "./income.call.answer.status";

export type CallAnswerResponse = {
    clientsIdPair:ClientsIdPair,
    incomeCallAnswerStatus:IncomeCallAnswerStatus,
    answer?:RTCSessionDescriptionInit
}