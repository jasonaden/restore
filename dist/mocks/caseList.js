"use strict";
exports.caseList = {
    "new": [
        {
            "id": 1,
            "external_id": null,
            "blurb": "I want to personally thank you for signing up to try Desk.com! To ensure you get the most out of your trial, here are some helpful tips and quick ways to get started:\n\n1. USE IT - You\u2019ve got 14 days to try us out - please do so and tell us what you t",
            "priority": 4,
            "locked_until": null,
            "label_ids": [
                17
            ],
            "active_at": "2016-06-30T20:23:04Z",
            "changed_at": "2016-06-29T17:10:14Z",
            "created_at": "2016-06-17T21:45:37Z",
            "updated_at": "2016-06-30T20:48:31Z",
            "first_opened_at": "2016-06-20T19:25:18Z",
            "opened_at": "2016-06-20T19:25:18Z",
            "first_resolved_at": null,
            "resolved_at": null,
            "status": "open",
            "active_notes_count": 0,
            "active_attachments_count": 0,
            "has_pending_interactions": false,
            "has_failed_interactions": false,
            "description": null,
            "language": null,
            "received_at": "2016-06-17T21:45:37Z",
            "type": "email",
            "labels": [
                "Sample Case"
            ],
            "subject": "Getting Started with Your New Account",
            "route_status": "available",
            "custom_fields": {},
            "_links": {
                "self": {
                    "href": "/api/v2/cases/1",
                    "class": "case"
                },
                "message": {
                    "href": "/api/v2/cases/1/message",
                    "class": "email"
                },
                "customer": {
                    "href": "/api/v2/customers/2",
                    "class": "customer"
                },
                "labels": {
                    "href": "/api/v2/cases/1/labels",
                    "class": "label"
                },
                "assigned_user": null,
                "assigned_group": {
                    "href": "/api/v2/groups/5",
                    "class": "group"
                },
                "locked_by": null,
                "history": {
                    "href": "/api/v2/cases/1/history",
                    "class": "history"
                },
                "case_links": {
                    "href": "/api/v2/cases/1/links",
                    "class": "case_link",
                    "count": 0
                },
                "macro_preview": {
                    "href": "/api/v2/cases/1/macros/preview",
                    "class": "macro_preview"
                },
                "replies": {
                    "href": "/api/v2/cases/1/replies",
                    "class": "reply",
                    "count": 0
                },
                "draft": {
                    "href": "/api/v2/cases/1/replies/draft",
                    "class": "reply"
                },
                "notes": {
                    "href": "/api/v2/cases/1/notes",
                    "class": "note",
                    "count": 0
                },
                "attachments": {
                    "href": "/api/v2/cases/1/attachments",
                    "class": "attachment",
                    "count": 0
                }
            },
            "_embedded": {
                "customer": {
                    "id": 2,
                    "first_name": "Leyla",
                    "last_name": "Seka, GM",
                    "display_name": "Leyla Seka, GM",
                    "company": "Desk.com",
                    "company_name": "Desk.com",
                    "title": "GM Desk.com",
                    "external_id": null,
                    "locked_until": null,
                    "created_at": "2016-06-17T21:45:37Z",
                    "updated_at": "2016-06-17T21:45:37Z",
                    "label_ids": [],
                    "background": "Wowing customer",
                    "language": null,
                    "access_private_portal": true,
                    "access_company_cases": false,
                    "avatar": "http://pbs.twimg.com/profile_images/416699577912152064/tpYpoxJx_bigger.jpeg",
                    "uid": null,
                    "opportunity_value": "$3,438.00",
                    "custom_fields": {},
                    "emails": [
                        {
                            "type": "work",
                            "value": "support@desk.com"
                        }
                    ],
                    "phone_numbers": [],
                    "addresses": [],
                    "_links": {
                        "self": {
                            "href": "/api/v2/customers/2",
                            "class": "customer"
                        },
                        "locked_by": null,
                        "company": {
                            "href": "/api/v2/companies/2",
                            "class": "company"
                        },
                        "facebook_user": null,
                        "twitter_user": {
                            "href": "/api/v2/twitter_users/2",
                            "class": "twitter_user"
                        },
                        "cases": {
                            "href": "/api/v2/customers/2/cases",
                            "class": "case",
                            "count": 2
                        },
                        "labels": {
                            "href": "/api/v2/customers/2/labels",
                            "class": "label"
                        }
                    }
                },
                "message": {
                    "id": 2,
                    "created_at": "2016-06-17T21:45:37Z",
                    "updated_at": "2016-06-17T21:45:37Z",
                    "sent_at": null,
                    "erased_at": null,
                    "hidden_by": null,
                    "hidden_at": null,
                    "body": "I want to personally thank you for signing up to try Desk.com! To ensure you get the most out of your trial, here are some helpful tips and quick ways to get started:\n\n1. USE IT - You've got 14 days to try us out - please do so and tell us what you think!\n\n2. TEST OUT YOUR NEW SUPPORT EMAIL - Your new account includes your very own support email address. Send an email to it, watch it pop up in your Agent Desktop, then work to resolve your test case.\n\n3. RESOLVE CASES QUICKLY - This article https://support.desk.com/customer/portal/articles/1110369-agent-desktop-orientation gives you an overview of the Agent Desktop, where you'll see everything you need to quickly respond to your customers.\n\n4. CONTACT SUPPORT - The Desk.com WOW Team is always here to help you, so please contact them anytime at support@desk.com if you have questions, problems, suggestions, or just want to talk.\n\nThanks again for giving us a try. We would love to have you join the Desk.com family!\n\nCheers,\n\nLeyla D. Seka\nGM Desk.com\nsalesforce.com\n",
                    "from": "Leyla Seka <support@Desk.com>",
                    "to": null,
                    "cc": null,
                    "bcc": null,
                    "client_type": null,
                    "direction": "in",
                    "status": "received",
                    "subject": "Getting Started with Your New Account",
                    "hidden": false,
                    "_links": {
                        "self": {
                            "href": "/api/v2/cases/1/message",
                            "class": "email"
                        },
                        "splits": {
                            "href": "/api/v2/cases/1/replies/3/splits",
                            "class": "split"
                        },
                        "outbound_mailbox": null,
                        "case": {
                            "href": "/api/v2/cases/1",
                            "class": "case"
                        },
                        "customer": {
                            "href": "/api/v2/customers/2",
                            "class": "customer"
                        },
                        "sent_by": null,
                        "erased_by": null,
                        "attachments": {
                            "href": "/api/v2/cases/1/message/attachments",
                            "class": "attachment"
                        }
                    }
                },
                "draft": {
                    "id": 3,
                    "created_at": "2016-06-20T19:25:20Z",
                    "updated_at": "2016-06-20T19:25:27Z",
                    "sent_at": null,
                    "erased_at": null,
                    "hidden_by": null,
                    "hidden_at": null,
                    "body": "",
                    "from": "dadenJK <dadenjk@gmail.com>",
                    "to": "Leyla Seka <support@desk.com>",
                    "cc": null,
                    "bcc": null,
                    "client_type": null,
                    "direction": "out",
                    "status": "draft",
                    "subject": "Re: Getting Started with Your New Account",
                    "hidden": false,
                    "_links": {
                        "self": {
                            "href": "/api/v2/cases/1/replies/19",
                            "class": "email"
                        },
                        "splits": {
                            "href": "/api/v2/cases/1/replies/19/splits",
                            "class": "split"
                        },
                        "outbound_mailbox": {
                            "href": "/api/v2/mailboxes/outbound/1",
                            "class": "outbound_mailbox"
                        },
                        "case": {
                            "href": "/api/v2/cases/1",
                            "class": "case"
                        },
                        "customer": {
                            "href": "/api/v2/customers/2",
                            "class": "customer"
                        },
                        "sent_by": {
                            "href": "/api/v2/users/2",
                            "class": "user"
                        },
                        "erased_by": null,
                        "attachments": {
                            "href": "/api/v2/cases/1/replies/19/attachments",
                            "class": "attachment"
                        }
                    }
                }
            }
        },
        {
            "id": 2,
            "external_id": null,
            "blurb": null,
            "priority": 9,
            "locked_until": null,
            "label_ids": [
                17
            ],
            "active_at": "2016-06-30T20:23:29Z",
            "changed_at": "2016-06-20T19:25:12Z",
            "created_at": "2016-06-17T21:45:37Z",
            "updated_at": "2016-06-30T20:48:31Z",
            "first_opened_at": "2016-06-20T19:25:10Z",
            "opened_at": "2016-06-20T19:25:10Z",
            "first_resolved_at": null,
            "resolved_at": null,
            "status": "open",
            "active_notes_count": 0,
            "active_attachments_count": 0,
            "has_pending_interactions": false,
            "has_failed_interactions": false,
            "description": null,
            "language": null,
            "received_at": "2016-06-17T21:45:37Z",
            "type": "phone",
            "labels": [
                "Sample Case"
            ],
            "subject": "The Top 3 Features Our Customers Love!",
            "route_status": "available",
            "custom_fields": {},
            "_links": {
                "self": {
                    "href": "/api/v2/cases/2",
                    "class": "case"
                },
                "message": {
                    "href": "/api/v2/cases/2/message",
                    "class": "phone"
                },
                "customer": {
                    "href": "/api/v2/customers/2",
                    "class": "customer"
                },
                "labels": {
                    "href": "/api/v2/cases/2/labels",
                    "class": "label"
                },
                "assigned_user": {
                    "href": "/api/v2/users/2",
                    "class": "user"
                },
                "assigned_group": {
                    "href": "/api/v2/groups/3",
                    "class": "group"
                },
                "locked_by": null,
                "history": {
                    "href": "/api/v2/cases/2/history",
                    "class": "history"
                },
                "case_links": {
                    "href": "/api/v2/cases/2/links",
                    "class": "case_link",
                    "count": 0
                },
                "macro_preview": {
                    "href": "/api/v2/cases/2/macros/preview",
                    "class": "macro_preview"
                },
                "replies": {
                    "href": "/api/v2/cases/2/replies",
                    "class": "reply",
                    "count": 1
                },
                "draft": {
                    "href": "/api/v2/cases/2/replies/draft",
                    "class": "reply"
                },
                "notes": {
                    "href": "/api/v2/cases/2/notes",
                    "class": "note",
                    "count": 0
                },
                "attachments": {
                    "href": "/api/v2/cases/2/attachments",
                    "class": "attachment",
                    "count": 0
                }
            },
            "_embedded": {
                "customer": {
                    "id": 2,
                    "first_name": "Leyla",
                    "last_name": "Seka, GM",
                    "display_name": "Leyla Seka, GM",
                    "company": "Desk.com",
                    "company_name": "Desk.com",
                    "title": "GM Desk.com",
                    "external_id": null,
                    "locked_until": null,
                    "created_at": "2016-06-17T21:45:37Z",
                    "updated_at": "2016-06-17T21:45:37Z",
                    "label_ids": [],
                    "background": "Wowing customer",
                    "language": null,
                    "access_private_portal": true,
                    "access_company_cases": false,
                    "avatar": "http://pbs.twimg.com/profile_images/416699577912152064/tpYpoxJx_bigger.jpeg",
                    "uid": null,
                    "opportunity_value": "$3,438.00",
                    "custom_fields": {},
                    "emails": [
                        {
                            "type": "work",
                            "value": "support@desk.com"
                        }
                    ],
                    "phone_numbers": [],
                    "addresses": [],
                    "_links": {
                        "self": {
                            "href": "/api/v2/customers/2",
                            "class": "customer"
                        },
                        "locked_by": null,
                        "company": {
                            "href": "/api/v2/companies/2",
                            "class": "company"
                        },
                        "facebook_user": null,
                        "twitter_user": {
                            "href": "/api/v2/twitter_users/2",
                            "class": "twitter_user"
                        },
                        "cases": {
                            "href": "/api/v2/customers/2/cases",
                            "class": "case",
                            "count": 2
                        },
                        "labels": {
                            "href": "/api/v2/customers/2/labels",
                            "class": "label"
                        }
                    }
                },
                "message": {
                    "id": 2,
                    "created_at": "2016-06-17T21:45:37Z",
                    "updated_at": "2016-06-17T21:45:37Z",
                    "sent_at": null,
                    "erased_at": null,
                    "body": "Desk.com makes it easy to WOW your customers because it gives you the tools to offer super fast customer support. \n\nHere are 3 features our customers love to use to make offering support fast and easy:\n\n1. Macros - Quick shortcuts that allow you to do multiple actions in one click. https://support.desk.com/customer/portal/articles/1380-building-shortcuts-with-macros\n\n2. Case Filters - Get organized by using filters to group cases together and prioritize based on specific criteria. https://support.desk.com/customer/portal/articles/2741-understanding-case-filters\n\n3. Bulk Updating - Reply to multiple cases at once using our \"bulk update\" feature. https://support.desk.com/customer/portal/articles/3269-updating-multiple-cases-at-once-with-bulk-update\n\nNeed help setting these up? Contact our WOW team at support@desk.com.\n",
                    "direction": "in",
                    "status": "received",
                    "entered_at": "2016-06-17T21:45:37Z",
                    "_links": {
                        "self": {
                            "href": "/api/v2/cases/2/message",
                            "class": "phone_call"
                        },
                        "case": {
                            "href": "/api/v2/cases/2",
                            "class": "case"
                        },
                        "customer": {
                            "href": "/api/v2/customers/2",
                            "class": "customer"
                        },
                        "entered_by": {
                            "href": "/api/v2/users/2",
                            "class": "user"
                        },
                        "erased_by": null
                    }
                },
                "draft": {
                    "id": 3,
                    "created_at": "2016-06-20T19:25:12Z",
                    "updated_at": "2016-06-20T19:25:12Z",
                    "sent_at": null,
                    "erased_at": null,
                    "body": null,
                    "direction": "out",
                    "status": "draft",
                    "entered_at": null,
                    "_links": {
                        "self": {
                            "href": "/api/v2/cases/2/replies/18",
                            "class": "phone_call"
                        },
                        "case": {
                            "href": "/api/v2/cases/2",
                            "class": "case"
                        },
                        "customer": {
                            "href": "/api/v2/customers/2",
                            "class": "customer"
                        },
                        "entered_by": {
                            "href": "/api/v2/users/2",
                            "class": "user"
                        },
                        "erased_by": null
                    }
                }
            }
        },
        {
            "id": 3,
            "external_id": null,
            "blurb": null,
            "priority": 5,
            "locked_until": null,
            "label_ids": [],
            "active_at": "2016-06-24T20:23:08Z",
            "changed_at": "2016-06-20T19:23:59Z",
            "created_at": "2016-06-20T16:11:28Z",
            "updated_at": "2016-06-24T20:29:49Z",
            "first_opened_at": "2016-06-20T19:23:59Z",
            "opened_at": "2016-06-20T19:23:59Z",
            "first_resolved_at": null,
            "resolved_at": null,
            "status": "open",
            "active_notes_count": 0,
            "active_attachments_count": 0,
            "has_pending_interactions": false,
            "has_failed_interactions": false,
            "description": null,
            "language": null,
            "received_at": "2016-06-20T16:11:29Z",
            "type": "twitter",
            "labels": [],
            "subject": "@JoeBagel1 I have a problem I need you to fix.",
            "route_status": "available",
            "custom_fields": {},
            "_links": {
                "self": {
                    "href": "/api/v2/cases/3",
                    "class": "case"
                },
                "message": {
                    "href": "/api/v2/cases/3/message",
                    "class": "tweet"
                },
                "customer": {
                    "href": "/api/v2/customers/3",
                    "class": "customer"
                },
                "labels": {
                    "href": "/api/v2/cases/3/labels",
                    "class": "label"
                },
                "assigned_user": null,
                "assigned_group": {
                    "href": "/api/v2/groups/3",
                    "class": "group"
                },
                "locked_by": null,
                "history": {
                    "href": "/api/v2/cases/3/history",
                    "class": "history"
                },
                "case_links": {
                    "href": "/api/v2/cases/3/links",
                    "class": "case_link",
                    "count": 0
                },
                "macro_preview": {
                    "href": "/api/v2/cases/3/macros/preview",
                    "class": "macro_preview"
                },
                "replies": {
                    "href": "/api/v2/cases/3/replies",
                    "class": "reply",
                    "count": 0
                },
                "draft": {
                    "href": "/api/v2/cases/3/replies/draft",
                    "class": "reply"
                },
                "notes": {
                    "href": "/api/v2/cases/3/notes",
                    "class": "note",
                    "count": 0
                },
                "attachments": {
                    "href": "/api/v2/cases/3/attachments",
                    "class": "attachment",
                    "count": 0
                }
            },
            "_embedded": {
                "customer": {
                    "id": 3,
                    "first_name": "David",
                    "last_name": "Aden",
                    "display_name": "David Aden",
                    "company": null,
                    "company_name": null,
                    "title": null,
                    "external_id": null,
                    "locked_until": null,
                    "created_at": "2016-06-20T16:11:28Z",
                    "updated_at": "2016-06-20T16:11:28Z",
                    "label_ids": [],
                    "background": "AngularJS developer. Full stack web developer. Opi.",
                    "language": null,
                    "access_private_portal": true,
                    "access_company_cases": false,
                    "avatar": "http://abs.twimg.com/sticky/default_profile_images/default_profile_4_bigger.png",
                    "uid": null,
                    "opportunity_value": "$3,540.00",
                    "custom_fields": {},
                    "emails": [],
                    "phone_numbers": [],
                    "addresses": [],
                    "_links": {
                        "self": {
                            "href": "/api/v2/customers/3",
                            "class": "customer"
                        },
                        "locked_by": null,
                        "company": null,
                        "facebook_user": null,
                        "twitter_user": {
                            "href": "/api/v2/twitter_users/3",
                            "class": "twitter_user"
                        },
                        "cases": {
                            "href": "/api/v2/customers/3/cases",
                            "class": "case",
                            "count": 4
                        },
                        "labels": {
                            "href": "/api/v2/customers/3/labels",
                            "class": "label"
                        }
                    }
                },
                "message": {
                    "id": 1,
                    "body": "@JoeBagel1 I have a problem I need you to fix.",
                    "direction": "in",
                    "status": "received",
                    "created_at": "2016-06-20T16:11:28Z",
                    "updated_at": "2016-06-20T16:11:28Z",
                    "erased_at": null,
                    "sent_at": null,
                    "type": "mention",
                    "twitter_status_id": "456103520677429248",
                    "to": null,
                    "from": "dadenva",
                    "_links": {
                        "self": {
                            "href": "/api/v2/cases/3/message",
                            "class": "tweet"
                        },
                        "case": {
                            "href": "/api/v2/cases/3",
                            "class": "case"
                        },
                        "customer": {
                            "href": "/api/v2/customers/3",
                            "class": "customer"
                        },
                        "sent_by": null,
                        "twitter_account": {
                            "href": "/api/v2/twitter_accounts/1",
                            "class": "twitter_account"
                        },
                        "favorited_by_twitter_account": null,
                        "erased_by": null,
                        "retweeted_by": null,
                        "favorited_by": null
                    }
                },
                "draft": {
                    "id": 13,
                    "body": "@dadenva ",
                    "direction": "out",
                    "status": "draft",
                    "created_at": "2016-06-20T19:24:01Z",
                    "updated_at": "2016-06-20T19:24:36Z",
                    "erased_at": null,
                    "sent_at": null,
                    "type": "mention",
                    "twitter_status_id": null,
                    "to": null,
                    "from": "JoeBagel1",
                    "_links": {
                        "self": {
                            "href": "/api/v2/cases/3/replies/17",
                            "class": "tweet"
                        },
                        "case": {
                            "href": "/api/v2/cases/3",
                            "class": "case"
                        },
                        "customer": {
                            "href": "/api/v2/customers/3",
                            "class": "customer"
                        },
                        "sent_by": {
                            "href": "/api/v2/users/2",
                            "class": "user"
                        },
                        "twitter_account": {
                            "href": "/api/v2/twitter_accounts/1",
                            "class": "twitter_account"
                        },
                        "favorited_by_twitter_account": null,
                        "erased_by": null,
                        "retweeted_by": null,
                        "favorited_by": null
                    }
                }
            }
        },
        {
            "id": 4,
            "external_id": null,
            "blurb": null,
            "priority": 5,
            "locked_until": null,
            "label_ids": [],
            "active_at": null,
            "changed_at": "2016-06-20T16:11:29Z",
            "created_at": "2016-06-20T16:11:29Z",
            "updated_at": "2016-06-20T16:11:29Z",
            "first_opened_at": null,
            "opened_at": null,
            "first_resolved_at": null,
            "resolved_at": null,
            "status": "new",
            "active_notes_count": 0,
            "active_attachments_count": 0,
            "has_pending_interactions": false,
            "has_failed_interactions": false,
            "description": null,
            "language": null,
            "received_at": "2016-06-20T16:11:29Z",
            "type": "twitter",
            "labels": [],
            "subject": "@JoeBagel1 this is a test case to see if it comes through",
            "route_status": "available",
            "custom_fields": {},
            "_links": {
                "self": {
                    "href": "/api/v2/cases/4",
                    "class": "case"
                },
                "message": {
                    "href": "/api/v2/cases/4/message",
                    "class": "tweet"
                },
                "customer": {
                    "href": "/api/v2/customers/3",
                    "class": "customer"
                },
                "labels": {
                    "href": "/api/v2/cases/4/labels",
                    "class": "label"
                },
                "assigned_user": null,
                "assigned_group": {
                    "href": "/api/v2/groups/3",
                    "class": "group"
                },
                "locked_by": null,
                "history": {
                    "href": "/api/v2/cases/4/history",
                    "class": "history"
                },
                "case_links": {
                    "href": "/api/v2/cases/4/links",
                    "class": "case_link",
                    "count": 0
                },
                "macro_preview": {
                    "href": "/api/v2/cases/4/macros/preview",
                    "class": "macro_preview"
                },
                "replies": {
                    "href": "/api/v2/cases/4/replies",
                    "class": "reply",
                    "count": 0
                },
                "draft": {
                    "href": "/api/v2/cases/4/replies/draft",
                    "class": "reply"
                },
                "notes": {
                    "href": "/api/v2/cases/4/notes",
                    "class": "note",
                    "count": 0
                },
                "attachments": {
                    "href": "/api/v2/cases/4/attachments",
                    "class": "attachment",
                    "count": 0
                }
            },
            "_embedded": {
                "customer": {
                    "id": 3,
                    "first_name": "David",
                    "last_name": "Aden",
                    "display_name": "David Aden",
                    "company": null,
                    "company_name": null,
                    "title": null,
                    "external_id": null,
                    "locked_until": null,
                    "created_at": "2016-06-20T16:11:28Z",
                    "updated_at": "2016-06-20T16:11:28Z",
                    "label_ids": [],
                    "background": "AngularJS developer. Full stack web developer. Opi.",
                    "language": null,
                    "access_private_portal": true,
                    "access_company_cases": false,
                    "avatar": "http://abs.twimg.com/sticky/default_profile_images/default_profile_4_bigger.png",
                    "uid": null,
                    "opportunity_value": "$3,540.00",
                    "custom_fields": {},
                    "emails": [],
                    "phone_numbers": [],
                    "addresses": [],
                    "_links": {
                        "self": {
                            "href": "/api/v2/customers/3",
                            "class": "customer"
                        },
                        "locked_by": null,
                        "company": null,
                        "facebook_user": null,
                        "twitter_user": {
                            "href": "/api/v2/twitter_users/3",
                            "class": "twitter_user"
                        },
                        "cases": {
                            "href": "/api/v2/customers/3/cases",
                            "class": "case",
                            "count": 4
                        },
                        "labels": {
                            "href": "/api/v2/customers/3/labels",
                            "class": "label"
                        }
                    }
                },
                "message": {
                    "id": 2,
                    "body": "@JoeBagel1 this is a test case to see if it comes through",
                    "direction": "in",
                    "status": "received",
                    "created_at": "2016-06-20T16:11:29Z",
                    "updated_at": "2016-06-20T16:11:29Z",
                    "erased_at": null,
                    "sent_at": null,
                    "type": "mention",
                    "twitter_status_id": "484065952653668353",
                    "to": null,
                    "from": "dadenva",
                    "_links": {
                        "self": {
                            "href": "/api/v2/cases/4/message",
                            "class": "tweet"
                        },
                        "case": {
                            "href": "/api/v2/cases/4",
                            "class": "case"
                        },
                        "customer": {
                            "href": "/api/v2/customers/3",
                            "class": "customer"
                        },
                        "sent_by": null,
                        "twitter_account": {
                            "href": "/api/v2/twitter_accounts/1",
                            "class": "twitter_account"
                        },
                        "favorited_by_twitter_account": null,
                        "erased_by": null,
                        "retweeted_by": null,
                        "favorited_by": null
                    }
                },
                "draft": null
            }
        },
        {
            "id": 5,
            "external_id": null,
            "blurb": null,
            "priority": 5,
            "locked_until": null,
            "label_ids": [],
            "active_at": null,
            "changed_at": "2016-06-20T16:11:30Z",
            "created_at": "2016-06-20T16:11:30Z",
            "updated_at": "2016-06-20T16:11:30Z",
            "first_opened_at": null,
            "opened_at": null,
            "first_resolved_at": null,
            "resolved_at": null,
            "status": "new",
            "active_notes_count": 0,
            "active_attachments_count": 0,
            "has_pending_interactions": false,
            "has_failed_interactions": false,
            "description": null,
            "language": null,
            "received_at": "2016-06-20T16:11:30Z",
            "type": "twitter",
            "labels": [],
            "subject": "@JoeBagel1 this is a second test case.",
            "route_status": "available",
            "custom_fields": {},
            "_links": {
                "self": {
                    "href": "/api/v2/cases/5",
                    "class": "case"
                },
                "message": {
                    "href": "/api/v2/cases/5/message",
                    "class": "tweet"
                },
                "customer": {
                    "href": "/api/v2/customers/3",
                    "class": "customer"
                },
                "labels": {
                    "href": "/api/v2/cases/5/labels",
                    "class": "label"
                },
                "assigned_user": null,
                "assigned_group": {
                    "href": "/api/v2/groups/3",
                    "class": "group"
                },
                "locked_by": null,
                "history": {
                    "href": "/api/v2/cases/5/history",
                    "class": "history"
                },
                "case_links": {
                    "href": "/api/v2/cases/5/links",
                    "class": "case_link",
                    "count": 0
                },
                "macro_preview": {
                    "href": "/api/v2/cases/5/macros/preview",
                    "class": "macro_preview"
                },
                "replies": {
                    "href": "/api/v2/cases/5/replies",
                    "class": "reply",
                    "count": 0
                },
                "draft": {
                    "href": "/api/v2/cases/5/replies/draft",
                    "class": "reply"
                },
                "notes": {
                    "href": "/api/v2/cases/5/notes",
                    "class": "note",
                    "count": 0
                },
                "attachments": {
                    "href": "/api/v2/cases/5/attachments",
                    "class": "attachment",
                    "count": 0
                }
            },
            "_embedded": {
                "customer": {
                    "id": 3,
                    "first_name": "David",
                    "last_name": "Aden",
                    "display_name": "David Aden",
                    "company": null,
                    "company_name": null,
                    "title": null,
                    "external_id": null,
                    "locked_until": null,
                    "created_at": "2016-06-20T16:11:28Z",
                    "updated_at": "2016-06-20T16:11:28Z",
                    "label_ids": [],
                    "background": "AngularJS developer. Full stack web developer. Opi.",
                    "language": null,
                    "access_private_portal": true,
                    "access_company_cases": false,
                    "avatar": "http://abs.twimg.com/sticky/default_profile_images/default_profile_4_bigger.png",
                    "uid": null,
                    "opportunity_value": "$3,540.00",
                    "custom_fields": {},
                    "emails": [],
                    "phone_numbers": [],
                    "addresses": [],
                    "_links": {
                        "self": {
                            "href": "/api/v2/customers/3",
                            "class": "customer"
                        },
                        "locked_by": null,
                        "company": null,
                        "facebook_user": null,
                        "twitter_user": {
                            "href": "/api/v2/twitter_users/3",
                            "class": "twitter_user"
                        },
                        "cases": {
                            "href": "/api/v2/customers/3/cases",
                            "class": "case",
                            "count": 4
                        },
                        "labels": {
                            "href": "/api/v2/customers/3/labels",
                            "class": "label"
                        }
                    }
                },
                "message": {
                    "id": 3,
                    "body": "@JoeBagel1 this is a second test case.",
                    "direction": "in",
                    "status": "received",
                    "created_at": "2016-06-20T16:11:30Z",
                    "updated_at": "2016-06-20T16:11:30Z",
                    "erased_at": null,
                    "sent_at": null,
                    "type": "mention",
                    "twitter_status_id": "484069943366144000",
                    "to": null,
                    "from": "dadenva",
                    "_links": {
                        "self": {
                            "href": "/api/v2/cases/5/message",
                            "class": "tweet"
                        },
                        "case": {
                            "href": "/api/v2/cases/5",
                            "class": "case"
                        },
                        "customer": {
                            "href": "/api/v2/customers/3",
                            "class": "customer"
                        },
                        "sent_by": null,
                        "twitter_account": {
                            "href": "/api/v2/twitter_accounts/1",
                            "class": "twitter_account"
                        },
                        "favorited_by_twitter_account": null,
                        "erased_by": null,
                        "retweeted_by": null,
                        "favorited_by": null
                    }
                },
                "draft": null
            }
        },
        {
            "id": 6,
            "external_id": null,
            "blurb": null,
            "priority": 5,
            "locked_until": null,
            "label_ids": [],
            "active_at": "2016-06-24T19:41:03Z",
            "changed_at": "2016-06-24T19:41:03Z",
            "created_at": "2016-06-20T16:11:30Z",
            "updated_at": "2016-06-24T20:03:21Z",
            "first_opened_at": "2016-06-24T19:41:03Z",
            "opened_at": "2016-06-24T19:41:03Z",
            "first_resolved_at": null,
            "resolved_at": null,
            "status": "open",
            "active_notes_count": 0,
            "active_attachments_count": 0,
            "has_pending_interactions": false,
            "has_failed_interactions": false,
            "description": null,
            "language": null,
            "received_at": "2016-06-20T16:11:30Z",
            "type": "twitter",
            "labels": [],
            "subject": "@JoeBagel1 from support to joe Bagel",
            "route_status": "available",
            "custom_fields": {},
            "_links": {
                "self": {
                    "href": "/api/v2/cases/6",
                    "class": "case"
                },
                "message": {
                    "href": "/api/v2/cases/6/message",
                    "class": "tweet"
                },
                "customer": {
                    "href": "/api/v2/customers/4",
                    "class": "customer"
                },
                "labels": {
                    "href": "/api/v2/cases/6/labels",
                    "class": "label"
                },
                "assigned_user": null,
                "assigned_group": {
                    "href": "/api/v2/groups/3",
                    "class": "group"
                },
                "locked_by": null,
                "history": {
                    "href": "/api/v2/cases/6/history",
                    "class": "history"
                },
                "case_links": {
                    "href": "/api/v2/cases/6/links",
                    "class": "case_link",
                    "count": 0
                },
                "macro_preview": {
                    "href": "/api/v2/cases/6/macros/preview",
                    "class": "macro_preview"
                },
                "replies": {
                    "href": "/api/v2/cases/6/replies",
                    "class": "reply",
                    "count": 0
                },
                "draft": {
                    "href": "/api/v2/cases/6/replies/draft",
                    "class": "reply"
                },
                "notes": {
                    "href": "/api/v2/cases/6/notes",
                    "class": "note",
                    "count": 0
                },
                "attachments": {
                    "href": "/api/v2/cases/6/attachments",
                    "class": "attachment",
                    "count": 0
                }
            },
            "_embedded": {
                "customer": {
                    "id": 4,
                    "first_name": "Adam",
                    "last_name": "Agent",
                    "display_name": "Adam Agent",
                    "company": null,
                    "company_name": null,
                    "title": null,
                    "external_id": null,
                    "locked_until": null,
                    "created_at": "2016-06-20T16:11:30Z",
                    "updated_at": "2016-06-20T16:11:30Z",
                    "label_ids": [],
                    "background": null,
                    "language": null,
                    "access_private_portal": true,
                    "access_company_cases": false,
                    "avatar": "http://pbs.twimg.com/profile_images/463700890742837248/w1-sBOfd_bigger.png",
                    "uid": null,
                    "opportunity_value": "$0.00",
                    "custom_fields": {},
                    "emails": [],
                    "phone_numbers": [],
                    "addresses": [],
                    "_links": {
                        "self": {
                            "href": "/api/v2/customers/4",
                            "class": "customer"
                        },
                        "locked_by": null,
                        "company": null,
                        "facebook_user": null,
                        "twitter_user": {
                            "href": "/api/v2/twitter_users/4",
                            "class": "twitter_user"
                        },
                        "cases": {
                            "href": "/api/v2/customers/4/cases",
                            "class": "case",
                            "count": 6
                        },
                        "labels": {
                            "href": "/api/v2/customers/4/labels",
                            "class": "label"
                        }
                    }
                },
                "message": {
                    "id": 4,
                    "body": "@JoeBagel1 from support to joe Bagel",
                    "direction": "in",
                    "status": "received",
                    "created_at": "2016-06-20T16:11:30Z",
                    "updated_at": "2016-06-20T16:11:30Z",
                    "erased_at": null,
                    "sent_at": null,
                    "type": "mention",
                    "twitter_status_id": "486882482231730176",
                    "to": null,
                    "from": "AdamAgent1",
                    "_links": {
                        "self": {
                            "href": "/api/v2/cases/6/message",
                            "class": "tweet"
                        },
                        "case": {
                            "href": "/api/v2/cases/6",
                            "class": "case"
                        },
                        "customer": {
                            "href": "/api/v2/customers/4",
                            "class": "customer"
                        },
                        "sent_by": null,
                        "twitter_account": {
                            "href": "/api/v2/twitter_accounts/1",
                            "class": "twitter_account"
                        },
                        "favorited_by_twitter_account": null,
                        "erased_by": null,
                        "retweeted_by": null,
                        "favorited_by": null
                    }
                },
                "draft": {
                    "id": 15,
                    "body": "@AdamAgent1",
                    "direction": "out",
                    "status": "draft",
                    "created_at": "2016-06-24T19:41:05Z",
                    "updated_at": "2016-06-24T19:41:05Z",
                    "erased_at": null,
                    "sent_at": null,
                    "type": "mention",
                    "twitter_status_id": null,
                    "to": null,
                    "from": "JoeBagel1",
                    "_links": {
                        "self": {
                            "href": "/api/v2/cases/6/replies/21",
                            "class": "tweet"
                        },
                        "case": {
                            "href": "/api/v2/cases/6",
                            "class": "case"
                        },
                        "customer": {
                            "href": "/api/v2/customers/4",
                            "class": "customer"
                        },
                        "sent_by": {
                            "href": "/api/v2/users/2",
                            "class": "user"
                        },
                        "twitter_account": {
                            "href": "/api/v2/twitter_accounts/1",
                            "class": "twitter_account"
                        },
                        "favorited_by_twitter_account": null,
                        "erased_by": null,
                        "retweeted_by": null,
                        "favorited_by": null
                    }
                }
            }
        },
        {
            "id": 7,
            "external_id": null,
            "blurb": null,
            "priority": 5,
            "locked_until": null,
            "label_ids": [],
            "active_at": "2016-06-24T16:13:19Z",
            "changed_at": "2016-06-20T19:23:26Z",
            "created_at": "2016-06-20T16:11:31Z",
            "updated_at": "2016-06-24T16:53:56Z",
            "first_opened_at": "2016-06-20T19:23:26Z",
            "opened_at": "2016-06-20T19:23:26Z",
            "first_resolved_at": null,
            "resolved_at": null,
            "status": "open",
            "active_notes_count": 0,
            "active_attachments_count": 0,
            "has_pending_interactions": false,
            "has_failed_interactions": false,
            "description": null,
            "language": null,
            "received_at": "2016-06-20T16:11:31Z",
            "type": "twitter",
            "labels": [],
            "subject": "@joebagel1 from dadenva to joe",
            "route_status": "available",
            "custom_fields": {},
            "_links": {
                "self": {
                    "href": "/api/v2/cases/7",
                    "class": "case"
                },
                "message": {
                    "href": "/api/v2/cases/7/message",
                    "class": "tweet"
                },
                "customer": {
                    "href": "/api/v2/customers/3",
                    "class": "customer"
                },
                "labels": {
                    "href": "/api/v2/cases/7/labels",
                    "class": "label"
                },
                "assigned_user": null,
                "assigned_group": {
                    "href": "/api/v2/groups/3",
                    "class": "group"
                },
                "locked_by": null,
                "history": {
                    "href": "/api/v2/cases/7/history",
                    "class": "history"
                },
                "case_links": {
                    "href": "/api/v2/cases/7/links",
                    "class": "case_link",
                    "count": 0
                },
                "macro_preview": {
                    "href": "/api/v2/cases/7/macros/preview",
                    "class": "macro_preview"
                },
                "replies": {
                    "href": "/api/v2/cases/7/replies",
                    "class": "reply",
                    "count": 0
                },
                "draft": {
                    "href": "/api/v2/cases/7/replies/draft",
                    "class": "reply"
                },
                "notes": {
                    "href": "/api/v2/cases/7/notes",
                    "class": "note",
                    "count": 0
                },
                "attachments": {
                    "href": "/api/v2/cases/7/attachments",
                    "class": "attachment",
                    "count": 0
                }
            },
            "_embedded": {
                "customer": {
                    "id": 3,
                    "first_name": "David",
                    "last_name": "Aden",
                    "display_name": "David Aden",
                    "company": null,
                    "company_name": null,
                    "title": null,
                    "external_id": null,
                    "locked_until": null,
                    "created_at": "2016-06-20T16:11:28Z",
                    "updated_at": "2016-06-20T16:11:28Z",
                    "label_ids": [],
                    "background": "AngularJS developer. Full stack web developer. Opi.",
                    "language": null,
                    "access_private_portal": true,
                    "access_company_cases": false,
                    "avatar": "http://abs.twimg.com/sticky/default_profile_images/default_profile_4_bigger.png",
                    "uid": null,
                    "opportunity_value": "$3,540.00",
                    "custom_fields": {},
                    "emails": [],
                    "phone_numbers": [],
                    "addresses": [],
                    "_links": {
                        "self": {
                            "href": "/api/v2/customers/3",
                            "class": "customer"
                        },
                        "locked_by": null,
                        "company": null,
                        "facebook_user": null,
                        "twitter_user": {
                            "href": "/api/v2/twitter_users/3",
                            "class": "twitter_user"
                        },
                        "cases": {
                            "href": "/api/v2/customers/3/cases",
                            "class": "case",
                            "count": 4
                        },
                        "labels": {
                            "href": "/api/v2/customers/3/labels",
                            "class": "label"
                        }
                    }
                },
                "message": {
                    "id": 5,
                    "body": "@joebagel1 from dadenva to joe",
                    "direction": "in",
                    "status": "received",
                    "created_at": "2016-06-20T16:11:31Z",
                    "updated_at": "2016-06-20T16:11:31Z",
                    "erased_at": null,
                    "sent_at": null,
                    "type": "mention",
                    "twitter_status_id": "486882769856126976",
                    "to": null,
                    "from": "dadenva",
                    "_links": {
                        "self": {
                            "href": "/api/v2/cases/7/message",
                            "class": "tweet"
                        },
                        "case": {
                            "href": "/api/v2/cases/7",
                            "class": "case"
                        },
                        "customer": {
                            "href": "/api/v2/customers/3",
                            "class": "customer"
                        },
                        "sent_by": null,
                        "twitter_account": {
                            "href": "/api/v2/twitter_accounts/1",
                            "class": "twitter_account"
                        },
                        "favorited_by_twitter_account": null,
                        "erased_by": null,
                        "retweeted_by": null,
                        "favorited_by": null
                    }
                },
                "draft": {
                    "id": 12,
                    "body": "@dadenva",
                    "direction": "out",
                    "status": "draft",
                    "created_at": "2016-06-20T19:23:27Z",
                    "updated_at": "2016-06-20T19:23:27Z",
                    "erased_at": null,
                    "sent_at": null,
                    "type": "mention",
                    "twitter_status_id": null,
                    "to": null,
                    "from": "JoeBagel1",
                    "_links": {
                        "self": {
                            "href": "/api/v2/cases/7/replies/16",
                            "class": "tweet"
                        },
                        "case": {
                            "href": "/api/v2/cases/7",
                            "class": "case"
                        },
                        "customer": {
                            "href": "/api/v2/customers/3",
                            "class": "customer"
                        },
                        "sent_by": {
                            "href": "/api/v2/users/2",
                            "class": "user"
                        },
                        "twitter_account": {
                            "href": "/api/v2/twitter_accounts/1",
                            "class": "twitter_account"
                        },
                        "favorited_by_twitter_account": null,
                        "erased_by": null,
                        "retweeted_by": null,
                        "favorited_by": null
                    }
                }
            }
        },
        {
            "id": 8,
            "external_id": null,
            "blurb": null,
            "priority": 5,
            "locked_until": null,
            "label_ids": [],
            "active_at": null,
            "changed_at": "2016-06-20T16:11:31Z",
            "created_at": "2016-06-20T16:11:31Z",
            "updated_at": "2016-06-20T16:11:31Z",
            "first_opened_at": null,
            "opened_at": null,
            "first_resolved_at": null,
            "resolved_at": null,
            "status": "new",
            "active_notes_count": 0,
            "active_attachments_count": 0,
            "has_pending_interactions": false,
            "has_failed_interactions": false,
            "description": null,
            "language": null,
            "received_at": "2016-06-20T16:11:31Z",
            "type": "twitter",
            "labels": [],
            "subject": "@JoeBagel1 here's a response back, does this solve it?",
            "route_status": "available",
            "custom_fields": {},
            "_links": {
                "self": {
                    "href": "/api/v2/cases/8",
                    "class": "case"
                },
                "message": {
                    "href": "/api/v2/cases/8/message",
                    "class": "tweet"
                },
                "customer": {
                    "href": "/api/v2/customers/4",
                    "class": "customer"
                },
                "labels": {
                    "href": "/api/v2/cases/8/labels",
                    "class": "label"
                },
                "assigned_user": null,
                "assigned_group": {
                    "href": "/api/v2/groups/3",
                    "class": "group"
                },
                "locked_by": null,
                "history": {
                    "href": "/api/v2/cases/8/history",
                    "class": "history"
                },
                "case_links": {
                    "href": "/api/v2/cases/8/links",
                    "class": "case_link",
                    "count": 0
                },
                "macro_preview": {
                    "href": "/api/v2/cases/8/macros/preview",
                    "class": "macro_preview"
                },
                "replies": {
                    "href": "/api/v2/cases/8/replies",
                    "class": "reply",
                    "count": 0
                },
                "draft": {
                    "href": "/api/v2/cases/8/replies/draft",
                    "class": "reply"
                },
                "notes": {
                    "href": "/api/v2/cases/8/notes",
                    "class": "note",
                    "count": 0
                },
                "attachments": {
                    "href": "/api/v2/cases/8/attachments",
                    "class": "attachment",
                    "count": 0
                }
            },
            "_embedded": {
                "customer": {
                    "id": 4,
                    "first_name": "Adam",
                    "last_name": "Agent",
                    "display_name": "Adam Agent",
                    "company": null,
                    "company_name": null,
                    "title": null,
                    "external_id": null,
                    "locked_until": null,
                    "created_at": "2016-06-20T16:11:30Z",
                    "updated_at": "2016-06-20T16:11:30Z",
                    "label_ids": [],
                    "background": null,
                    "language": null,
                    "access_private_portal": true,
                    "access_company_cases": false,
                    "avatar": "http://pbs.twimg.com/profile_images/463700890742837248/w1-sBOfd_bigger.png",
                    "uid": null,
                    "opportunity_value": "$0.00",
                    "custom_fields": {},
                    "emails": [],
                    "phone_numbers": [],
                    "addresses": [],
                    "_links": {
                        "self": {
                            "href": "/api/v2/customers/4",
                            "class": "customer"
                        },
                        "locked_by": null,
                        "company": null,
                        "facebook_user": null,
                        "twitter_user": {
                            "href": "/api/v2/twitter_users/4",
                            "class": "twitter_user"
                        },
                        "cases": {
                            "href": "/api/v2/customers/4/cases",
                            "class": "case",
                            "count": 6
                        },
                        "labels": {
                            "href": "/api/v2/customers/4/labels",
                            "class": "label"
                        }
                    }
                },
                "message": {
                    "id": 6,
                    "body": "@JoeBagel1 here's a response back, does this solve it?",
                    "direction": "in",
                    "status": "received",
                    "created_at": "2016-06-20T16:11:31Z",
                    "updated_at": "2016-06-20T16:11:31Z",
                    "erased_at": null,
                    "sent_at": null,
                    "type": "mention",
                    "twitter_status_id": "528659198251659264",
                    "to": null,
                    "from": "AdamAgent1",
                    "_links": {
                        "self": {
                            "href": "/api/v2/cases/8/message",
                            "class": "tweet"
                        },
                        "case": {
                            "href": "/api/v2/cases/8",
                            "class": "case"
                        },
                        "customer": {
                            "href": "/api/v2/customers/4",
                            "class": "customer"
                        },
                        "sent_by": null,
                        "twitter_account": {
                            "href": "/api/v2/twitter_accounts/1",
                            "class": "twitter_account"
                        },
                        "favorited_by_twitter_account": null,
                        "erased_by": null,
                        "retweeted_by": null,
                        "favorited_by": null
                    }
                },
                "draft": null
            }
        },
        {
            "id": 9,
            "external_id": null,
            "blurb": null,
            "priority": 5,
            "locked_until": null,
            "label_ids": [],
            "active_at": null,
            "changed_at": "2016-06-20T16:11:32Z",
            "created_at": "2016-06-20T16:11:32Z",
            "updated_at": "2016-06-20T16:11:32Z",
            "first_opened_at": null,
            "opened_at": null,
            "first_resolved_at": null,
            "resolved_at": null,
            "status": "new",
            "active_notes_count": 0,
            "active_attachments_count": 0,
            "has_pending_interactions": false,
            "has_failed_interactions": false,
            "description": null,
            "language": null,
            "received_at": "2016-06-20T16:11:32Z",
            "type": "twitter",
            "labels": [],
            "subject": "@JoeBagel1 okay here's an answer so to the second request",
            "route_status": "available",
            "custom_fields": {},
            "_links": {
                "self": {
                    "href": "/api/v2/cases/9",
                    "class": "case"
                },
                "message": {
                    "href": "/api/v2/cases/9/message",
                    "class": "tweet"
                },
                "customer": {
                    "href": "/api/v2/customers/4",
                    "class": "customer"
                },
                "labels": {
                    "href": "/api/v2/cases/9/labels",
                    "class": "label"
                },
                "assigned_user": null,
                "assigned_group": {
                    "href": "/api/v2/groups/3",
                    "class": "group"
                },
                "locked_by": null,
                "history": {
                    "href": "/api/v2/cases/9/history",
                    "class": "history"
                },
                "case_links": {
                    "href": "/api/v2/cases/9/links",
                    "class": "case_link",
                    "count": 0
                },
                "macro_preview": {
                    "href": "/api/v2/cases/9/macros/preview",
                    "class": "macro_preview"
                },
                "replies": {
                    "href": "/api/v2/cases/9/replies",
                    "class": "reply",
                    "count": 0
                },
                "draft": {
                    "href": "/api/v2/cases/9/replies/draft",
                    "class": "reply"
                },
                "notes": {
                    "href": "/api/v2/cases/9/notes",
                    "class": "note",
                    "count": 0
                },
                "attachments": {
                    "href": "/api/v2/cases/9/attachments",
                    "class": "attachment",
                    "count": 0
                }
            },
            "_embedded": {
                "customer": {
                    "id": 4,
                    "first_name": "Adam",
                    "last_name": "Agent",
                    "display_name": "Adam Agent",
                    "company": null,
                    "company_name": null,
                    "title": null,
                    "external_id": null,
                    "locked_until": null,
                    "created_at": "2016-06-20T16:11:30Z",
                    "updated_at": "2016-06-20T16:11:30Z",
                    "label_ids": [],
                    "background": null,
                    "language": null,
                    "access_private_portal": true,
                    "access_company_cases": false,
                    "avatar": "http://pbs.twimg.com/profile_images/463700890742837248/w1-sBOfd_bigger.png",
                    "uid": null,
                    "opportunity_value": "$0.00",
                    "custom_fields": {},
                    "emails": [],
                    "phone_numbers": [],
                    "addresses": [],
                    "_links": {
                        "self": {
                            "href": "/api/v2/customers/4",
                            "class": "customer"
                        },
                        "locked_by": null,
                        "company": null,
                        "facebook_user": null,
                        "twitter_user": {
                            "href": "/api/v2/twitter_users/4",
                            "class": "twitter_user"
                        },
                        "cases": {
                            "href": "/api/v2/customers/4/cases",
                            "class": "case",
                            "count": 6
                        },
                        "labels": {
                            "href": "/api/v2/customers/4/labels",
                            "class": "label"
                        }
                    }
                },
                "message": {
                    "id": 7,
                    "body": "@JoeBagel1 okay here's an answer so to the second request",
                    "direction": "in",
                    "status": "received",
                    "created_at": "2016-06-20T16:11:32Z",
                    "updated_at": "2016-06-20T16:11:32Z",
                    "erased_at": null,
                    "sent_at": null,
                    "type": "mention",
                    "twitter_status_id": "528661488446484481",
                    "to": null,
                    "from": "AdamAgent1",
                    "_links": {
                        "self": {
                            "href": "/api/v2/cases/9/message",
                            "class": "tweet"
                        },
                        "case": {
                            "href": "/api/v2/cases/9",
                            "class": "case"
                        },
                        "customer": {
                            "href": "/api/v2/customers/4",
                            "class": "customer"
                        },
                        "sent_by": null,
                        "twitter_account": {
                            "href": "/api/v2/twitter_accounts/1",
                            "class": "twitter_account"
                        },
                        "favorited_by_twitter_account": null,
                        "erased_by": null,
                        "retweeted_by": null,
                        "favorited_by": null
                    }
                },
                "draft": null
            }
        },
        {
            "id": 10,
            "external_id": null,
            "blurb": null,
            "priority": 5,
            "locked_until": null,
            "label_ids": [],
            "active_at": "2016-06-30T18:21:23Z",
            "changed_at": "2016-06-24T16:13:41Z",
            "created_at": "2016-06-20T16:11:32Z",
            "updated_at": "2016-06-30T19:41:00Z",
            "first_opened_at": "2016-06-24T16:13:41Z",
            "opened_at": "2016-06-24T16:13:41Z",
            "first_resolved_at": null,
            "resolved_at": null,
            "status": "open",
            "active_notes_count": 0,
            "active_attachments_count": 0,
            "has_pending_interactions": false,
            "has_failed_interactions": false,
            "description": null,
            "language": null,
            "received_at": "2016-06-20T16:11:32Z",
            "type": "twitter",
            "labels": [],
            "subject": "@JoeBagel1 and an answer back",
            "route_status": "available",
            "custom_fields": {},
            "_links": {
                "self": {
                    "href": "/api/v2/cases/10",
                    "class": "case"
                },
                "message": {
                    "href": "/api/v2/cases/10/message",
                    "class": "tweet"
                },
                "customer": {
                    "href": "/api/v2/customers/4",
                    "class": "customer"
                },
                "labels": {
                    "href": "/api/v2/cases/10/labels",
                    "class": "label"
                },
                "assigned_user": null,
                "assigned_group": {
                    "href": "/api/v2/groups/3",
                    "class": "group"
                },
                "locked_by": null,
                "history": {
                    "href": "/api/v2/cases/10/history",
                    "class": "history"
                },
                "case_links": {
                    "href": "/api/v2/cases/10/links",
                    "class": "case_link",
                    "count": 0
                },
                "macro_preview": {
                    "href": "/api/v2/cases/10/macros/preview",
                    "class": "macro_preview"
                },
                "replies": {
                    "href": "/api/v2/cases/10/replies",
                    "class": "reply",
                    "count": 0
                },
                "draft": {
                    "href": "/api/v2/cases/10/replies/draft",
                    "class": "reply"
                },
                "notes": {
                    "href": "/api/v2/cases/10/notes",
                    "class": "note",
                    "count": 0
                },
                "attachments": {
                    "href": "/api/v2/cases/10/attachments",
                    "class": "attachment",
                    "count": 0
                }
            },
            "_embedded": {
                "customer": {
                    "id": 4,
                    "first_name": "Adam",
                    "last_name": "Agent",
                    "display_name": "Adam Agent",
                    "company": null,
                    "company_name": null,
                    "title": null,
                    "external_id": null,
                    "locked_until": null,
                    "created_at": "2016-06-20T16:11:30Z",
                    "updated_at": "2016-06-20T16:11:30Z",
                    "label_ids": [],
                    "background": null,
                    "language": null,
                    "access_private_portal": true,
                    "access_company_cases": false,
                    "avatar": "http://pbs.twimg.com/profile_images/463700890742837248/w1-sBOfd_bigger.png",
                    "uid": null,
                    "opportunity_value": "$0.00",
                    "custom_fields": {},
                    "emails": [],
                    "phone_numbers": [],
                    "addresses": [],
                    "_links": {
                        "self": {
                            "href": "/api/v2/customers/4",
                            "class": "customer"
                        },
                        "locked_by": null,
                        "company": null,
                        "facebook_user": null,
                        "twitter_user": {
                            "href": "/api/v2/twitter_users/4",
                            "class": "twitter_user"
                        },
                        "cases": {
                            "href": "/api/v2/customers/4/cases",
                            "class": "case",
                            "count": 6
                        },
                        "labels": {
                            "href": "/api/v2/customers/4/labels",
                            "class": "label"
                        }
                    }
                },
                "message": {
                    "id": 8,
                    "body": "@JoeBagel1 and an answer back",
                    "direction": "in",
                    "status": "received",
                    "created_at": "2016-06-20T16:11:32Z",
                    "updated_at": "2016-06-20T16:11:32Z",
                    "erased_at": null,
                    "sent_at": null,
                    "type": "mention",
                    "twitter_status_id": "528666963850309632",
                    "to": null,
                    "from": "AdamAgent1",
                    "_links": {
                        "self": {
                            "href": "/api/v2/cases/10/message",
                            "class": "tweet"
                        },
                        "case": {
                            "href": "/api/v2/cases/10",
                            "class": "case"
                        },
                        "customer": {
                            "href": "/api/v2/customers/4",
                            "class": "customer"
                        },
                        "sent_by": null,
                        "twitter_account": {
                            "href": "/api/v2/twitter_accounts/1",
                            "class": "twitter_account"
                        },
                        "favorited_by_twitter_account": null,
                        "erased_by": null,
                        "retweeted_by": null,
                        "favorited_by": null
                    }
                },
                "draft": {
                    "id": 14,
                    "body": "@AdamAgent1",
                    "direction": "out",
                    "status": "draft",
                    "created_at": "2016-06-24T16:13:42Z",
                    "updated_at": "2016-06-24T16:13:42Z",
                    "erased_at": null,
                    "sent_at": null,
                    "type": "mention",
                    "twitter_status_id": null,
                    "to": null,
                    "from": "JoeBagel1",
                    "_links": {
                        "self": {
                            "href": "/api/v2/cases/10/replies/20",
                            "class": "tweet"
                        },
                        "case": {
                            "href": "/api/v2/cases/10",
                            "class": "case"
                        },
                        "customer": {
                            "href": "/api/v2/customers/4",
                            "class": "customer"
                        },
                        "sent_by": {
                            "href": "/api/v2/users/2",
                            "class": "user"
                        },
                        "twitter_account": {
                            "href": "/api/v2/twitter_accounts/1",
                            "class": "twitter_account"
                        },
                        "favorited_by_twitter_account": null,
                        "erased_by": null,
                        "retweeted_by": null,
                        "favorited_by": null
                    }
                }
            }
        },
        {
            "id": 11,
            "external_id": null,
            "blurb": null,
            "priority": 5,
            "locked_until": null,
            "label_ids": [],
            "active_at": "2016-06-28T21:28:49Z",
            "changed_at": "2016-06-20T17:59:06Z",
            "created_at": "2016-06-20T16:11:32Z",
            "updated_at": "2016-06-28T21:29:03Z",
            "first_opened_at": "2016-06-20T17:59:06Z",
            "opened_at": "2016-06-20T17:59:06Z",
            "first_resolved_at": null,
            "resolved_at": null,
            "status": "open",
            "active_notes_count": 0,
            "active_attachments_count": 0,
            "has_pending_interactions": false,
            "has_failed_interactions": false,
            "description": null,
            "language": null,
            "received_at": "2016-06-20T16:11:33Z",
            "type": "twitter",
            "labels": [],
            "subject": "@JoeBagel1 Here is a case you should look at.",
            "route_status": "available",
            "custom_fields": {},
            "_links": {
                "self": {
                    "href": "/api/v2/cases/11",
                    "class": "case"
                },
                "message": {
                    "href": "/api/v2/cases/11/message",
                    "class": "tweet"
                },
                "customer": {
                    "href": "/api/v2/customers/4",
                    "class": "customer"
                },
                "labels": {
                    "href": "/api/v2/cases/11/labels",
                    "class": "label"
                },
                "assigned_user": null,
                "assigned_group": {
                    "href": "/api/v2/groups/3",
                    "class": "group"
                },
                "locked_by": null,
                "history": {
                    "href": "/api/v2/cases/11/history",
                    "class": "history"
                },
                "case_links": {
                    "href": "/api/v2/cases/11/links",
                    "class": "case_link",
                    "count": 0
                },
                "macro_preview": {
                    "href": "/api/v2/cases/11/macros/preview",
                    "class": "macro_preview"
                },
                "replies": {
                    "href": "/api/v2/cases/11/replies",
                    "class": "reply",
                    "count": 0
                },
                "draft": {
                    "href": "/api/v2/cases/11/replies/draft",
                    "class": "reply"
                },
                "notes": {
                    "href": "/api/v2/cases/11/notes",
                    "class": "note",
                    "count": 0
                },
                "attachments": {
                    "href": "/api/v2/cases/11/attachments",
                    "class": "attachment",
                    "count": 0
                }
            },
            "_embedded": {
                "customer": {
                    "id": 4,
                    "first_name": "Adam",
                    "last_name": "Agent",
                    "display_name": "Adam Agent",
                    "company": null,
                    "company_name": null,
                    "title": null,
                    "external_id": null,
                    "locked_until": null,
                    "created_at": "2016-06-20T16:11:30Z",
                    "updated_at": "2016-06-20T16:11:30Z",
                    "label_ids": [],
                    "background": null,
                    "language": null,
                    "access_private_portal": true,
                    "access_company_cases": false,
                    "avatar": "http://pbs.twimg.com/profile_images/463700890742837248/w1-sBOfd_bigger.png",
                    "uid": null,
                    "opportunity_value": "$0.00",
                    "custom_fields": {},
                    "emails": [],
                    "phone_numbers": [],
                    "addresses": [],
                    "_links": {
                        "self": {
                            "href": "/api/v2/customers/4",
                            "class": "customer"
                        },
                        "locked_by": null,
                        "company": null,
                        "facebook_user": null,
                        "twitter_user": {
                            "href": "/api/v2/twitter_users/4",
                            "class": "twitter_user"
                        },
                        "cases": {
                            "href": "/api/v2/customers/4/cases",
                            "class": "case",
                            "count": 6
                        },
                        "labels": {
                            "href": "/api/v2/customers/4/labels",
                            "class": "label"
                        }
                    }
                },
                "message": {
                    "id": 9,
                    "body": "@JoeBagel1 Here is a case you should look at.",
                    "direction": "in",
                    "status": "received",
                    "created_at": "2016-06-20T16:11:32Z",
                    "updated_at": "2016-06-20T16:11:32Z",
                    "erased_at": null,
                    "sent_at": null,
                    "type": "mention",
                    "twitter_status_id": "542037832534335489",
                    "to": null,
                    "from": "AdamAgent1",
                    "_links": {
                        "self": {
                            "href": "/api/v2/cases/11/message",
                            "class": "tweet"
                        },
                        "case": {
                            "href": "/api/v2/cases/11",
                            "class": "case"
                        },
                        "customer": {
                            "href": "/api/v2/customers/4",
                            "class": "customer"
                        },
                        "sent_by": null,
                        "twitter_account": {
                            "href": "/api/v2/twitter_accounts/1",
                            "class": "twitter_account"
                        },
                        "favorited_by_twitter_account": null,
                        "erased_by": null,
                        "retweeted_by": null,
                        "favorited_by": null
                    }
                },
                "draft": {
                    "id": 11,
                    "body": "@AdamAgent1",
                    "direction": "out",
                    "status": "draft",
                    "created_at": "2016-06-20T17:59:08Z",
                    "updated_at": "2016-06-20T17:59:08Z",
                    "erased_at": null,
                    "sent_at": null,
                    "type": "mention",
                    "twitter_status_id": null,
                    "to": null,
                    "from": "JoeBagel1",
                    "_links": {
                        "self": {
                            "href": "/api/v2/cases/11/replies/15",
                            "class": "tweet"
                        },
                        "case": {
                            "href": "/api/v2/cases/11",
                            "class": "case"
                        },
                        "customer": {
                            "href": "/api/v2/customers/4",
                            "class": "customer"
                        },
                        "sent_by": {
                            "href": "/api/v2/users/2",
                            "class": "user"
                        },
                        "twitter_account": {
                            "href": "/api/v2/twitter_accounts/1",
                            "class": "twitter_account"
                        },
                        "favorited_by_twitter_account": null,
                        "erased_by": null,
                        "retweeted_by": null,
                        "favorited_by": null
                    }
                }
            }
        },
        {
            "id": 12,
            "external_id": null,
            "blurb": null,
            "priority": 5,
            "locked_until": null,
            "label_ids": [],
            "active_at": null,
            "changed_at": "2016-06-20T16:11:33Z",
            "created_at": "2016-06-20T16:11:33Z",
            "updated_at": "2016-06-20T16:11:33Z",
            "first_opened_at": null,
            "opened_at": null,
            "first_resolved_at": null,
            "resolved_at": null,
            "status": "new",
            "active_notes_count": 0,
            "active_attachments_count": 0,
            "has_pending_interactions": false,
            "has_failed_interactions": false,
            "description": null,
            "language": null,
            "received_at": "2016-06-20T16:11:33Z",
            "type": "twitter",
            "labels": [],
            "subject": "@JoeBagel1 and an answer to your reply.",
            "route_status": "available",
            "custom_fields": {},
            "_links": {
                "self": {
                    "href": "/api/v2/cases/12",
                    "class": "case"
                },
                "message": {
                    "href": "/api/v2/cases/12/message",
                    "class": "tweet"
                },
                "customer": {
                    "href": "/api/v2/customers/4",
                    "class": "customer"
                },
                "labels": {
                    "href": "/api/v2/cases/12/labels",
                    "class": "label"
                },
                "assigned_user": null,
                "assigned_group": {
                    "href": "/api/v2/groups/3",
                    "class": "group"
                },
                "locked_by": null,
                "history": {
                    "href": "/api/v2/cases/12/history",
                    "class": "history"
                },
                "case_links": {
                    "href": "/api/v2/cases/12/links",
                    "class": "case_link",
                    "count": 0
                },
                "macro_preview": {
                    "href": "/api/v2/cases/12/macros/preview",
                    "class": "macro_preview"
                },
                "replies": {
                    "href": "/api/v2/cases/12/replies",
                    "class": "reply",
                    "count": 0
                },
                "draft": {
                    "href": "/api/v2/cases/12/replies/draft",
                    "class": "reply"
                },
                "notes": {
                    "href": "/api/v2/cases/12/notes",
                    "class": "note",
                    "count": 0
                },
                "attachments": {
                    "href": "/api/v2/cases/12/attachments",
                    "class": "attachment",
                    "count": 0
                }
            },
            "_embedded": {
                "customer": {
                    "id": 4,
                    "first_name": "Adam",
                    "last_name": "Agent",
                    "display_name": "Adam Agent",
                    "company": null,
                    "company_name": null,
                    "title": null,
                    "external_id": null,
                    "locked_until": null,
                    "created_at": "2016-06-20T16:11:30Z",
                    "updated_at": "2016-06-20T16:11:30Z",
                    "label_ids": [],
                    "background": null,
                    "language": null,
                    "access_private_portal": true,
                    "access_company_cases": false,
                    "avatar": "http://pbs.twimg.com/profile_images/463700890742837248/w1-sBOfd_bigger.png",
                    "uid": null,
                    "opportunity_value": "$0.00",
                    "custom_fields": {},
                    "emails": [],
                    "phone_numbers": [],
                    "addresses": [],
                    "_links": {
                        "self": {
                            "href": "/api/v2/customers/4",
                            "class": "customer"
                        },
                        "locked_by": null,
                        "company": null,
                        "facebook_user": null,
                        "twitter_user": {
                            "href": "/api/v2/twitter_users/4",
                            "class": "twitter_user"
                        },
                        "cases": {
                            "href": "/api/v2/customers/4/cases",
                            "class": "case",
                            "count": 6
                        },
                        "labels": {
                            "href": "/api/v2/customers/4/labels",
                            "class": "label"
                        }
                    }
                },
                "message": {
                    "id": 10,
                    "body": "@JoeBagel1 and an answer to your reply.",
                    "direction": "in",
                    "status": "received",
                    "created_at": "2016-06-20T16:11:33Z",
                    "updated_at": "2016-06-20T16:11:33Z",
                    "erased_at": null,
                    "sent_at": null,
                    "type": "mention",
                    "twitter_status_id": "542038974886608896",
                    "to": null,
                    "from": "AdamAgent1",
                    "_links": {
                        "self": {
                            "href": "/api/v2/cases/12/message",
                            "class": "tweet"
                        },
                        "case": {
                            "href": "/api/v2/cases/12",
                            "class": "case"
                        },
                        "customer": {
                            "href": "/api/v2/customers/4",
                            "class": "customer"
                        },
                        "sent_by": null,
                        "twitter_account": {
                            "href": "/api/v2/twitter_accounts/1",
                            "class": "twitter_account"
                        },
                        "favorited_by_twitter_account": null,
                        "erased_by": null,
                        "retweeted_by": null,
                        "favorited_by": null
                    }
                },
                "draft": null
            }
        },
        {
            "id": 13,
            "external_id": null,
            "blurb": null,
            "priority": 4,
            "locked_until": null,
            "label_ids": [],
            "active_at": "2016-07-28T20:09:25Z",
            "changed_at": "2016-06-29T17:16:41Z",
            "created_at": "2016-06-29T17:14:02Z",
            "updated_at": "2016-07-28T21:17:55Z",
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
            "route_status": "available",
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
                "locked_by": null,
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
    ],
    "changed": [],
    "removed": [],
    "positions": [
        13,
        1,
        6,
        10,
        2,
        3,
        7,
        11,
        12,
        9,
        8,
        5,
        4
    ],
    "time": 1469743167
};
