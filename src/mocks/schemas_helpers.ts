

// We're going to use the 'self' value as the slug
export function generateSlug (entity) {
  let key = (entity._links && entity._links.self && entity._links.self.href) || entity.id;
  if (!key) {
    return;
  }
  if (key.indexOf('/api/v2') == 0) {
    key = key.slice(7)
  }
  return key;
}
