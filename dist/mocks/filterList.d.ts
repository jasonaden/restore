export declare const filterList: {
    "total_entries": number;
    "page": number;
    "_links": {
        "self": {
            "href": string;
            "class": string;
        };
        "first": {
            "href": string;
            "class": string;
        };
        "last": {
            "href": string;
            "class": string;
        };
        "previous": any;
        "next": any;
    };
    "_embedded": {
        "entries": {
            "id": number;
            "name": string;
            "position": number;
            "routing_enabled": boolean;
            "sort_field": string;
            "sort_direction": string;
            "_links": {
                "self": {
                    "href": string;
                    "class": string;
                };
                "group": any;
                "user": any;
                "cases": {
                    "href": string;
                    "class": string;
                    "count": number;
                };
            };
        }[];
    };
};
