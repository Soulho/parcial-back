export function BusinessLogicException(message: string, type: number) {
    this.message = message;
    this.type = type;
}

export function BadRequestException(message: string, type: number) {
    this.message = message;
    this.type = type;
}

export enum BusinessError {
    NOT_FOUND,
    PRECONDITION_FAILED,
    BAD_REQUEST
}