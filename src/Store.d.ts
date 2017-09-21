import { AbstractActor } from "js-actor";
export declare class Store<S> extends AbstractActor {
    state: S;
    setState: (state: Pick<S, keyof S>, callback?: () => void) => void;
}
