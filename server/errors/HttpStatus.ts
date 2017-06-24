export class HttpStatus {
    code: number;
    constructor(code: number) {
        this.code = code;
    }
    public static isInformational = (code: number) => code >= 100 && code <= 199;
    public static isSuccess = (code: number) => code >= 200 && code <= 299;
    public static isRedirect = (code: number) => code >= 300 && code <= 399;
    public static isClientError = (code: number) => code >= 400 && code <= 499;
    public static isServerError = (code: number) => code >= 400 && code <= 499;

}

export class InformationalStatus {
    public static readonly CONTINUE = new HttpStatus(100);
    public static readonly SWITCHING_PROTOCOLS = new HttpStatus(101);
}

export class SuccessStatus {
    public static readonly OK = new HttpStatus(200);
    public static readonly CREATED = new HttpStatus(201);
    public static readonly ACCEPTED = new HttpStatus(202);
    public static readonly NON_AUTHORITATIVE_INFORMATION = new HttpStatus(203);
    public static readonly NO_CONTENT = new HttpStatus(204);
    public static readonly RESET_CONTENT = new HttpStatus(205);
    public static readonly PARTIAL_CONTENT = new HttpStatus(206);
    public static readonly MULTI_STATUS = new HttpStatus(207);
}

export class RedirectStatus {
    public static readonly MULTIPLE_CHOICES = new HttpStatus(300);
    public static readonly MOVED_PERMANENTLY = new HttpStatus(301);
    public static readonly FOUND = new HttpStatus(302);
    public static readonly SEE_OTHER = new HttpStatus(303);
    public static readonly NOT_MODIFIED = new HttpStatus(304);
    public static readonly USE_PROXY = new HttpStatus(305);
    public static readonly RESERVED = new HttpStatus(306);
    public static readonly TEMPORARY_REDIRECT = new HttpStatus(307);
}

export class ClientError {
    public static readonly BAD_REQUEST = new HttpStatus(400);
    public static readonly UNAUTHORIZED = new HttpStatus(401);
    public static readonly PAYMENT_REQUIRED = new HttpStatus(402);
    public static readonly FORBIDDEN = new HttpStatus(403);
    public static readonly NOT_FOUND = new HttpStatus(404);
    public static readonly METHOD_NOT_ALLOWED = new HttpStatus(405);
    public static readonly NOT_ACCEPTABLE = new HttpStatus(406);
    public static readonly PROXY_AUTHENTICATION_REQUIRED = new HttpStatus(407);
    public static readonly REQUEST_TIMEOUT = new HttpStatus(408);
    public static readonly CONFLICT = new HttpStatus(409);
    public static readonly GONE = new HttpStatus(410);
    public static readonly LENGTH_REQUIRED = new HttpStatus(411);
    public static readonly PRECONDITION_FAILED = new HttpStatus(412);
    public static readonly REQUEST_ENTITY_TOO_LARGE = new HttpStatus(413);
    public static readonly REQUEST_URI_TOO_LONG = new HttpStatus(414);
    public static readonly UNSUPPORTED_MEDIA_TYPE = new HttpStatus(415);
    public static readonly REQUESTED_RANGE_NOT_SATISFIABLE = new HttpStatus(416);
    public static readonly EXPECTATION_FAILED = new HttpStatus(417);
    public static readonly UNPROCESSABLE_ENTITY = new HttpStatus(422);
    public static readonly LOCKED = new HttpStatus(423);
    public static readonly FAILED_DEPENDENCY = new HttpStatus(424);
    public static readonly PRECONDITION_REQUIRED = new HttpStatus(428);
    public static readonly TOO_MANY_REQUESTS = new HttpStatus(429);
    public static readonly REQUEST_HEADER_FIELDS_TOO_LARGE = new HttpStatus(431);
    public static readonly UNAVAILABLE_FOR_LEGAL_REASONS = new HttpStatus(451);
}

export class ServerError {
    public static readonly INTERNAL_SERVER_ERROR = new HttpStatus(500);
    public static readonly NOT_IMPLEMENTED = new HttpStatus(501);
    public static readonly BAD_GATEWAY = new HttpStatus(502);
    public static readonly SERVICE_UNAVAILABLE = new HttpStatus(503);
    public static readonly GATEWAY_TIMEOUT = new HttpStatus(504);
    public static readonly HTTP_VERSION_NOT_SUPPORTED = new HttpStatus(505);
    public static readonly INSUFFICIENT_STORAGE = new HttpStatus(507);
    public static readonly NETWORK_AUTHENTICATION_REQUIRED = new HttpStatus(511);
}
