import { Observable } from 'rxjs';

interface Error {
    status: string;
    msg: string;
}

export class NotAuthorization {
    private static instance: Observable<Error>;
    constructor() {}

    static getInstance(): Observable<Error> {
        if (!NotAuthorization.instance) {
            NotAuthorization.instance = new Observable(subscriber => {
                subscriber.next( { status: 'error', msg: 'o Authorization. Require user id and token.' } );
                subscriber.complete();
            });
        }
        return NotAuthorization.instance;
    }
}
