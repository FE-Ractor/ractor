import { AbstractActor } from "js-actor";
export declare class Store<S> extends AbstractActor {
    state: S;
    setState: (state: Partial<S>, callback?: () => void) => void;
}
