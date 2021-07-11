let isDev:boolean = false;

export const _ConsoleLog = (msg: string, ...optionalParams: any[]) => {
    if(isDev){
        console.log(msg, optionalParams);
    }
}

export const _DevConsoleSet = (value: boolean) => {
    isDev = value;
}