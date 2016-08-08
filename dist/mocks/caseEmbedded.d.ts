export declare const caseEmbedded: {
    "id": number;
    "external_id": any;
    "blurb": any;
    "priority": number;
    "locked_until": any;
    "label_ids": any[];
    "active_at": string;
    "changed_at": string;
    "created_at": string;
    "updated_at": string;
    "first_opened_at": string;
    "opened_at": string;
    "first_resolved_at": any;
    "resolved_at": any;
    "status": string;
    "active_notes_count": number;
    "active_attachments_count": number;
    "has_pending_interactions": boolean;
    "has_failed_interactions": boolean;
    "description": string;
    "language": any;
    "received_at": any;
    "type": string;
    "labels": any[];
    "subject": string;
    "route_status": string;
    "custom_fields": {};
    "_links": {
        "self": {
            "href": string;
            "class": string;
        };
        "message": {
            "href": string;
            "class": string;
        };
        "customer": {
            "href": string;
            "class": string;
        };
        "labels": {
            "href": string;
            "class": string;
        };
        "assigned_user": {
            "href": string;
            "class": string;
        };
        "assigned_group": {
            "href": string;
            "class": string;
        };
        "locked_by": {
            "href": string;
            "class": string;
        };
        "history": {
            "href": string;
            "class": string;
        };
        "case_links": {
            "href": string;
            "class": string;
            "count": number;
        };
        "macro_preview": {
            "href": string;
            "class": string;
        };
        "replies": {
            "href": string;
            "class": string;
            "count": number;
        };
        "draft": {
            "href": string;
            "class": string;
        };
        "notes": {
            "href": string;
            "class": string;
            "count": number;
        };
        "attachments": {
            "href": string;
            "class": string;
            "count": number;
        };
    };
    "_embedded": {
        "customer": {
            "id": number;
            "first_name": string;
            "last_name": string;
            "display_name": string;
            "company": string;
            "company_name": string;
            "title": any;
            "external_id": any;
            "locked_until": any;
            "created_at": string;
            "updated_at": string;
            "label_ids": any[];
            "background": any;
            "language": any;
            "access_private_portal": boolean;
            "access_company_cases": boolean;
            "avatar": string;
            "uid": any;
            "opportunity_value": string;
            "custom_fields": {};
            "emails": {
                "type": string;
                "value": string;
            }[];
            "phone_numbers": any[];
            "addresses": any[];
            "_links": {
                "self": {
                    "href": string;
                    "class": string;
                };
                "locked_by": any;
                "company": {
                    "href": string;
                    "class": string;
                };
                "facebook_user": any;
                "twitter_user": any;
                "cases": {
                    "href": string;
                    "class": string;
                    "count": number;
                };
                "labels": {
                    "href": string;
                    "class": string;
                };
            };
        };
        "message": {
            "id": number;
            "created_at": string;
            "updated_at": string;
            "sent_at": any;
            "erased_at": any;
            "hidden_by": any;
            "hidden_at": any;
            "body": any;
            "from": string;
            "to": string;
            "cc": any;
            "bcc": any;
            "client_type": string;
            "direction": string;
            "status": string;
            "subject": string;
            "hidden": boolean;
            "_links": {
                "self": {
                    "href": string;
                    "class": string;
                };
                "splits": {
                    "href": string;
                    "class": string;
                };
                "outbound_mailbox": {
                    "href": string;
                    "class": string;
                };
                "case": {
                    "href": string;
                    "class": string;
                };
                "customer": {
                    "href": string;
                    "class": string;
                };
                "sent_by": {
                    "href": string;
                    "class": string;
                };
                "erased_by": any;
                "attachments": {
                    "href": string;
                    "class": string;
                };
            };
        };
        "draft": {
            "id": number;
            "created_at": string;
            "updated_at": string;
            "sent_at": any;
            "erased_at": any;
            "hidden_by": any;
            "hidden_at": any;
            "body": any;
            "from": string;
            "to": string;
            "cc": any;
            "bcc": any;
            "client_type": string;
            "direction": string;
            "status": string;
            "subject": string;
            "hidden": boolean;
            "_links": {
                "self": {
                    "href": string;
                    "class": string;
                };
                "splits": {
                    "href": string;
                    "class": string;
                };
                "outbound_mailbox": {
                    "href": string;
                    "class": string;
                };
                "case": {
                    "href": string;
                    "class": string;
                };
                "customer": {
                    "href": string;
                    "class": string;
                };
                "sent_by": {
                    "href": string;
                    "class": string;
                };
                "erased_by": any;
                "attachments": {
                    "href": string;
                    "class": string;
                };
            };
        };
    };
};
