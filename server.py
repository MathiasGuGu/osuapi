import requests

req = requests.get("https://osu.ppy.sh/api/v2/me/osu", headers={"Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxOTI3MSIsImp0aSI6IjZkOWY3MWNkOWQ5YjNjZjM1YzhiMmFiMGI5NTNkNDcwYmI0NzAyMmVkNzlmYjUxNjNhZjgzMDk2ZjhjNTBhYzY5ZGU2MjBmNjgzNDNkYTlmIiwiaWF0IjoxNjcwNzIwNTYzLjE0MTgzNiwibmJmIjoxNjcwNzIwNTYzLjE0MTg0LCJleHAiOjE2NzA4MDY5MTEuNDYyNjEyLCJzdWIiOiIxMjgwNTU0NSIsInNjb3BlcyI6WyJpZGVudGlmeSIsInB1YmxpYyJdfQ.JV3BQGlN3X5qFCKi_EGa1Ia18QsulLVQi6L62P3FmE6G3ejEsJvgWoO0cFC1E7d_q-F9H5y0ED8QyResXuywDCrXhEb3uLhFoBiiz_03eW74gXn5S80f3hZ-1KHXTLpCSNHoPh-VLtRQ-1hwtDopEBZ5fYkcJ6BZ0Lt5tYgBp7WL09ez-CgeILCLHy2aGSfRInP_TQEOBoHaK2wL0I_1EejcdcEKcVtWnRA1sUud9tYr8F8vizcCO_r2_74BwNvBlhFVIJsCRlqZR_LzIF8fjGqadifoB5BB_wg-AAPEoB3ep1ZDdJEeUkSZoSkide1Hdh6wTZ-5yrh5oVCcIvylKEnu-2oWI42dhtdPOk4KXDab42xX8Z1mFz5BhIhAiyyqn3g3OWq2RF1txig93iYVk4Xzhrr0mJX_g4GX7JC8ErYBD2TQPPnY1o8C7U9G5W1U-ygirpySEpJ6Xc2omZQ2p7-4A5ciwCrt03MnMGEWhQ_BOopUHwh5uDrbK96ed76wljz3VYuSfNTmeNgTol8zu9XzxYPf_O3MTa9BIjmHAoFOSk6WBbjeGLqJZiIoZEvxuK6bmi6wqLZ2w0aRt9jBmWVuDsXaRmjvrq8CFSsQlyk5d5AP-N04HKDTRaVk3w3QaqmDm9VOpy54KvMBsFZFlMpQeF3iDgxbY7XGE0xT78k", 'Content-type': 'application/json', 'Accept': "application/json"})
print(req.text)