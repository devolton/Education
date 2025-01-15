import api from "../http/core";

export class EventService{
    static async getEventBySlug(slug){
        return await api.get(`/events/${slug}`);
    }
    static async getNeighbourEvents(slug){
        return await api.get(`/events/neighbours/${slug}`);
    }
    static async getRandomEventsRange(limit){
        return await api.get(`/events/random?limit:${limit}`);
    }
    static async getEventsRange(limit){
        return await api.get(`/events?limit=${limit}`);
    }
}