"use strict";
// We're going to use the 'self' value as the slug
function generateSlug(entity) {
    var key = (entity._links && entity._links.self && entity._links.self.href) || entity.id;
    if (!key) {
        return;
    }
    if (key.indexOf('/api/v2') == 0) {
        key = key.slice(7);
    }
    return key;
}
exports.generateSlug = generateSlug;
