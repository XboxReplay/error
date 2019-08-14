import { ErrorDetails, IXboxReplayError } from '..';

const defaultMessage = 'Something went wrong...';

const defaultDetails = {
    statusCode: 500,
    reason: 'INTERNAL_SERVER_ERROR'
};

export class XboxReplayError extends Error implements IXboxReplayError {
    static readonly details = { ...defaultDetails };

    __XboxReplay__ = true;
    details: ErrorDetails = { ...defaultDetails };

    constructor(message: string = defaultMessage, details: ErrorDetails = {}) {
        super(message);
        Error.captureStackTrace(this, XboxReplayError);
        this.name = 'XboxReplayError';
        this.details = {
            ...this.details,
            ...details
        };
    }
}

export default {
    badRequest: (message = 'Bad request', reason = 'BAD_REQUEST') =>
        new XboxReplayError(message, {
            statusCode: 400,
            reason
        }),
    unauthorized: (message = 'Unauthorized', reason = 'UNAUTHORIZED') =>
        new XboxReplayError(message, {
            statusCode: 401,
            reason
        }),
    forbidden: (message = 'Forbidden', reason = 'FORBIDDEN') =>
        new XboxReplayError(message, {
            statusCode: 403,
            reason
        }),
    internal: (message = defaultMessage, reason = defaultDetails.reason) =>
        new XboxReplayError(message, {
            statusCode: 500,
            reason
        }),
    build: (
        message = '',
        details: ErrorDetails = { ...XboxReplayError.details }
    ) => {
        if (typeof details === 'string') {
            details = {
                reason: details,
                statusCode: defaultDetails.statusCode
            };
        }

        return new XboxReplayError(message, details);
    }
};
