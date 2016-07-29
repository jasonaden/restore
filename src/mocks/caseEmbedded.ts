export const caseEmbedded = {
    "id": 13,
    "external_id": null,
    "blurb": null,
    "priority": 4,
    "locked_until": null,
    "label_ids": [],
    "active_at": "2016-07-28T19:08:55Z",
    "changed_at": "2016-06-29T17:16:41Z",
    "created_at": "2016-06-29T17:14:02Z",
    "updated_at": "2016-07-28T19:08:55Z",
    "first_opened_at": "2016-06-29T17:14:03Z",
    "opened_at": "2016-06-29T17:14:03Z",
    "first_resolved_at": null,
    "resolved_at": null,
    "status": "open",
    "active_notes_count": 0,
    "active_attachments_count": 0,
    "has_pending_interactions": false,
    "has_failed_interactions": false,
    "description": "This is the description for it.",
    "language": null,
    "received_at": null,
    "type": "email",
    "labels": [],
    "subject": "Here is the subject for a created email case",
    "route_status": "active",
    "custom_fields": {},
    "_links": {
        "self": {
            "href": "/api/v2/cases/13",
            "class": "case"
        },
        "message": {
            "href": "/api/v2/cases/13/message",
            "class": "email"
        },
        "customer": {
            "href": "/api/v2/customers/5",
            "class": "customer"
        },
        "labels": {
            "href": "/api/v2/cases/13/labels",
            "class": "label"
        },
        "assigned_user": {
            "href": "/api/v2/users/6",
            "class": "user"
        },
        "assigned_group": {
            "href": "/api/v2/groups/3",
            "class": "group"
        },
        "locked_by": {
            "href": "/api/v2/users/2",
            "class": "user"
        },
        "history": {
            "href": "/api/v2/cases/13/history",
            "class": "history"
        },
        "case_links": {
            "href": "/api/v2/cases/13/links",
            "class": "case_link",
            "count": 0
        },
        "macro_preview": {
            "href": "/api/v2/cases/13/macros/preview",
            "class": "macro_preview"
        },
        "replies": {
            "href": "/api/v2/cases/13/replies",
            "class": "reply",
            "count": 0
        },
        "draft": {
            "href": "/api/v2/cases/13/replies/draft",
            "class": "reply"
        },
        "notes": {
            "href": "/api/v2/cases/13/notes",
            "class": "note",
            "count": 0
        },
        "attachments": {
            "href": "/api/v2/cases/13/attachments",
            "class": "attachment",
            "count": 0
        }
    },
    "_embedded": {
        "customer": {
            "id": 5,
            "first_name": "New",
            "last_name": "Customer2",
            "display_name": "New Customer2",
            "company": "nowhere.com",
            "company_name": "nowhere.com",
            "title": null,
            "external_id": null,
            "locked_until": null,
            "created_at": "2016-06-29T17:14:00Z",
            "updated_at": "2016-06-29T17:14:01Z",
            "label_ids": [],
            "background": null,
            "language": null,
            "access_private_portal": true,
            "access_company_cases": false,
            "avatar": "http://www.gravatar.com/avatar/66dd93ff40c46ffa2fc71011764651c8?default=404&rating=PG&size=50",
            "uid": null,
            "opportunity_value": "$0.00",
            "custom_fields": {},
            "emails": [
                {
                    "type": "home",
                    "value": "newcustomer2@nowhere.com"
                }
            ],
            "phone_numbers": [],
            "addresses": [],
            "_links": {
                "self": {
                    "href": "/api/v2/customers/5",
                    "class": "customer"
                },
                "locked_by": null,
                "company": {
                    "href": "/api/v2/companies/4",
                    "class": "company"
                },
                "facebook_user": null,
                "twitter_user": null,
                "cases": {
                    "href": "/api/v2/customers/5/cases",
                    "class": "case",
                    "count": 1
                },
                "labels": {
                    "href": "/api/v2/customers/5/labels",
                    "class": "label"
                }
            }
        },
        "message": {
            "id": 4,
            "created_at": "2016-06-29T17:14:02Z",
            "updated_at": "2016-06-29T17:16:29Z",
            "sent_at": null,
            "erased_at": null,
            "hidden_by": null,
            "hidden_at": null,
            "body": null,
            "from": "dadenJK <dadenjk@gmail.com>",
            "to": "newcustomer2@nowhere.com",
            "cc": null,
            "bcc": null,
            "client_type": "desk_api",
            "direction": "out",
            "status": "draft",
            "subject": "",
            "hidden": false,
            "_links": {
                "self": {
                    "href": "/api/v2/cases/13/message",
                    "class": "email"
                },
                "splits": {
                    "href": "/api/v2/cases/13/replies/22/splits",
                    "class": "split"
                },
                "outbound_mailbox": {
                    "href": "/api/v2/mailboxes/outbound/1",
                    "class": "outbound_mailbox"
                },
                "case": {
                    "href": "/api/v2/cases/13",
                    "class": "case"
                },
                "customer": {
                    "href": "/api/v2/customers/5",
                    "class": "customer"
                },
                "sent_by": {
                    "href": "/api/v2/users/2",
                    "class": "user"
                },
                "erased_by": null,
                "attachments": {
                    "href": "/api/v2/cases/13/message/attachments",
                    "class": "attachment"
                }
            }
        },
        "draft": {
            "id": 4,
            "created_at": "2016-06-29T17:14:02Z",
            "updated_at": "2016-06-29T17:16:29Z",
            "sent_at": null,
            "erased_at": null,
            "hidden_by": null,
            "hidden_at": null,
            "body": null,
            "from": "dadenJK <dadenjk@gmail.com>",
            "to": "newcustomer2@nowhere.com",
            "cc": null,
            "bcc": null,
            "client_type": "desk_api",
            "direction": "out",
            "status": "draft",
            "subject": "",
            "hidden": false,
            "_links": {
                "self": {
                    "href": "/api/v2/cases/13/message",
                    "class": "email"
                },
                "splits": {
                    "href": "/api/v2/cases/13/replies/22/splits",
                    "class": "split"
                },
                "outbound_mailbox": {
                    "href": "/api/v2/mailboxes/outbound/1",
                    "class": "outbound_mailbox"
                },
                "case": {
                    "href": "/api/v2/cases/13",
                    "class": "case"
                },
                "customer": {
                    "href": "/api/v2/customers/5",
                    "class": "customer"
                },
                "sent_by": {
                    "href": "/api/v2/users/2",
                    "class": "user"
                },
                "erased_by": null,
                "attachments": {
                    "href": "/api/v2/cases/13/message/attachments",
                    "class": "attachment"
                }
            }
        }
    }
}