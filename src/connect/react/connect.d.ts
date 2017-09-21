/// <reference types="react" />
import * as React from "react";
import { Store } from "../../Store";
export declare function connect<S extends object>(store: new () => Store<S>): <P>(component: React.ComponentClass<P>) => any;
