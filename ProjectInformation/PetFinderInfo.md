# API Access Granted
You have been granted Petfinder API access and assigned an API key and secret. Your API key expires if unused for 120 days, but you can always request a new one.

## API Key
ygcuWhnebW0MHgMwxny1ThmJ3OeJzIzMUaF9b3IeviUmOJVsYy

## Secret
RsPfXnm5hAVCghknjJjCOyxFp4jwh0cHHgAZ8eUD

## Docs
https://www.petfinder.com/developers/v2/docs/

## API Calls

(Using cURL, will need to be converted for Node use)

curl -d "grant_type=client_credentials&client_id=ygcuWhnebW0MHgMwxny1ThmJ3OeJzIzMUaF9b3IeviUmOJVsYy&client_secret=RsPfXnm5hAVCghknjJjCOyxFp4jwh0cHHgAZ8eUD" https://api.petfinder.com/v2/oauth2/token


Get Token:
`curl -d "grant_type=client_credentials&client_id={ygcuWhnebW0MHgMwxny1ThmJ3OeJzIzMUaF9b3IeviUmOJVsYy}&client_secret={RsPfXnm5hAVCghknjJjCOyxFp4jwh0cHHgAZ8eUD}" https://api.petfinder.com/v2/oauth2/token`

Responce Structure:
`{
  "token_type": "Bearer",
  "expires_in": 3600,
  "access_token": "..."
}`

Request:
`curl -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}" GET https://api.petfinder.com/v2/{CATEGORY}/{ACTION}?{parameter_1}={value_1}&{parameter_2}={value_2}`

