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

{
	"token_type":"Bearer",
	"expires_in":3600,
	"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ5Z2N1V2huZWJXME1IZ013eG55MVRobUozT2VKekl6TVVhRjliM0lldmlVbU9KVnNZeSIsImp0aSI6ImQ1ZDlhYjYzMzBkNzA3NDllOGVlZGQwZWEzN2YyZDUwODc5MTliOWM5MzBjY2Q1ZTMxNWU3YTg1ZWY1YzVhZjVkNDM0MGYyNDAzYTE2NTlhIiwiaWF0IjoxNjEzODcwMjE4LCJuYmYiOjE2MTM4NzAyMTgsImV4cCI6MTYxMzg3MzgxOCwic3ViIjoiIiwic2NvcGVzIjpbXX0.RHu2Ay5fNFJWws7CEK7YJZN0INuQ-jUheUUUiGE6M63J4iRWlbGbCuZIFr36MjDkV1apZhyWmPDVw3t3and0hJ-KL85NiX5m_Zd3sKV7uG9Pv-xsbXScedEl_clxdGy80e9IASK8MfyL2thxARHe90zmBSm3QHvFUK900TjPlIBID-WCR99byC9G03cC8MtwUDsCIiK3qEEC4yySA-Zc4jGpR5r8lB2QUvwmCjMu-Qk7gfwm6vrTsko107XuWyrkA8JjehS9qCwhXJH7CJPr9WMIkWyDdxshnfdR3krSVJkRSlPomlR0LmZlRrEg7b3c84Cnim9PO0Mx_pp5zwOBAw"
}

`curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ5Z2N1V2huZWJXME1IZ013eG55MVRobUozT2VKekl6TVVhRjliM0lldmlVbU9KVnNZeSIsImp0aSI6ImQ1ZDlhYjYzMzBkNzA3NDllOGVlZGQwZWEzN2YyZDUwODc5MTliOWM5MzBjY2Q1ZTMxNWU3YTg1ZWY1YzVhZjVkNDM0MGYyNDAzYTE2NTlhIiwiaWF0IjoxNjEzODcwMjE4LCJuYmYiOjE2MTM4NzAyMTgsImV4cCI6MTYxMzg3MzgxOCwic3ViIjoiIiwic2NvcGVzIjpbXX0.RHu2Ay5fNFJWws7CEK7YJZN0INuQ-jUheUUUiGE6M63J4iRWlbGbCuZIFr36MjDkV1apZhyWmPDVw3t3and0hJ-KL85NiX5m_Zd3sKV7uG9Pv-xsbXScedEl_clxdGy80e9IASK8MfyL2thxARHe90zmBSm3QHvFUK900TjPlIBID-WCR99byC9G03cC8MtwUDsCIiK3qEEC4yySA-Zc4jGpR5r8lB2QUvwmCjMu-Qk7gfwm6vrTsko107XuWyrkA8JjehS9qCwhXJH7CJPr9WMIkWyDdxshnfdR3krSVJkRSlPomlR0LmZlRrEg7b3c84Cnim9PO0Mx_pp5zwOBAw" GET https://api.petfinder.com/v2/animals?type=dog&page=2`


Get Token:
`curl -d "grant_type=client_credentials&client_id=ygcuWhnebW0MHgMwxny1ThmJ3OeJzIzMUaF9b3IeviUmOJVsYy&client_secret=RsPfXnm5hAVCghknjJjCOyxFp4jwh0cHHgAZ8eUD" https://api.petfinder.com/v2/oauth2/token`

Responce Structure:
`{
  "token_type": "Bearer",
  "expires_in": 3600,
  "access_token": "..."
}`

Request:
`curl -H "Authorization: Bearer {YOUR_ACCESS_TOKEN}" GET https://api.petfinder.com/v2/{CATEGORY}/{ACTION}?{parameter_1}={value_1}&{parameter_2}={value_2}`

