# API examples

Set `BASE_URL=http://localhost:5000/api` in your API client.

## Create user

`POST {{BASE_URL}}/users`

```json
{
  "name": "Demo User",
  "email": "demo2@example.com",
  "preferences": ["technology", "javascript", "backend"]
}
```

## Browse items

`GET {{BASE_URL}}/items?page=1&limit=10&category=technology`

## Update preferences

`PATCH {{BASE_URL}}/users/USER_ID/preferences`

```json
{ "preferences": ["design", "ux"] }
```

## Record a view

`POST {{BASE_URL}}/items/ITEM_ID/interactions`

```json
{ "userId": "USER_ID", "type": "view", "context": { "source": "home" } }
```

## Rate an item

```json
{ "userId": "USER_ID", "type": "rating", "value": 5 }
```

## Fetch recommendations

`GET {{BASE_URL}}/recommendations/USER_ID?limit=8&category=technology`
