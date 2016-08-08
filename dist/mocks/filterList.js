"use strict";
exports.filterList = {
    "total_entries": 4,
    "page": 1,
    "_links": {
        "self": {
            "href": "/api/v2/users/2/filters?fields=id%2Cname%2Cposition%2Ccase_counts%2Csort_direction%2Csort_field%2Crouting_enabled&page=1&per_page=15&user_id=2",
            "class": "page"
        },
        "first": {
            "href": "/api/v2/users/2/filters?fields=id%2Cname%2Cposition%2Ccase_counts%2Csort_direction%2Csort_field%2Crouting_enabled&page=1&per_page=15&user_id=2",
            "class": "page"
        },
        "last": {
            "href": "/api/v2/users/2/filters?fields=id%2Cname%2Cposition%2Ccase_counts%2Csort_direction%2Csort_field%2Crouting_enabled&page=1&per_page=15&user_id=2",
            "class": "page"
        },
        "previous": null,
        "next": null
    },
    "_embedded": {
        "entries": [
            {
                "id": 11,
                "name": "Inbox",
                "position": 1,
                "routing_enabled": false,
                "sort_field": "updated_at",
                "sort_direction": "desc",
                "_links": {
                    "self": {
                        "href": "/api/v2/filters/11",
                        "class": "filter"
                    },
                    "group": null,
                    "user": null,
                    "cases": {
                        "href": "/api/v2/filters/11/cases",
                        "class": "case",
                        "count": 13
                    }
                }
            },
            {
                "id": 12,
                "name": "All Cases",
                "position": 2,
                "routing_enabled": false,
                "sort_field": "updated_at",
                "sort_direction": "desc",
                "_links": {
                    "self": {
                        "href": "/api/v2/filters/12",
                        "class": "filter"
                    },
                    "group": null,
                    "user": null,
                    "cases": {
                        "href": "/api/v2/filters/12/cases",
                        "class": "case",
                        "count": 13
                    }
                }
            },
            {
                "id": 13,
                "name": "My Cases",
                "position": 3,
                "routing_enabled": false,
                "sort_field": "updated_at",
                "sort_direction": "desc",
                "_links": {
                    "self": {
                        "href": "/api/v2/filters/13",
                        "class": "filter"
                    },
                    "group": null,
                    "user": null,
                    "cases": {
                        "href": "/api/v2/filters/13/cases",
                        "class": "case",
                        "count": 1
                    }
                }
            },
            {
                "id": 19,
                "name": "Outbox",
                "position": 13,
                "routing_enabled": false,
                "sort_field": "updated_at",
                "sort_direction": "desc",
                "_links": {
                    "self": {
                        "href": "/api/v2/filters/19",
                        "class": "filter"
                    },
                    "group": null,
                    "user": null,
                    "cases": {
                        "href": "/api/v2/filters/19/cases",
                        "class": "case",
                        "count": 0
                    }
                }
            }
        ]
    }
};
