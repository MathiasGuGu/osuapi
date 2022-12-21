import requests
bearer_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxOTI3MSIsImp0aSI6ImNiNjMzMWI0ZjcyYWViOTQ0YWVjZGIzMTllOTQ5NjMzM2NjYWI4ZTM3NDMzMGRiNjAyNWRiOTVmZDZlNTA2NDkyMjU2NDgzNjJkODQxOGM4IiwiaWF0IjoxNjcxMTI1Njk5LjI5NzQ1NSwibmJmIjoxNjcxMTI1Njk5LjI5NzQ1OCwiZXhwIjoxNjcxMjExODM2LjMwMjI4NCwic3ViIjoiIiwic2NvcGVzIjpbInB1YmxpYyJdfQ.Oi9ua6GP-eQDnBz5iiCJVjV1CoYPp9F8Qge8616RIY6TXNdGLx0VNRREpvzfvOKqNyrbXw53FUNiYa2ZburZk6Imc623XSNsc3KvuJv3qE-5Tv1RExCNOG5wTYEZCRIDWBxIcL6Cz9t2IhOhZjopjMjIeLcMPpZy3z7YrZkBJkcHt8AaoNdhz0Ijgca7wTnMjwhe5_FChFqsnNB6Nh84f-uhxnm3rbVYIDK9LCxFIXI-udejhgGjxaZlfqlf-uYoy6nnrCIlEBQmB-xpahQqgVrG927HtKKeIXBj7mEEXeV79HXHnLSk4PL1pltF0ILVdq8w5Or6-VBHpjljF5fekRiBmMG8A4uQifBAtmNZkcA4P5rnMMww1vOlLJxd1fK-jJk9AKmLZ6tT2xDkU9z-e_Av6i-urKNaB2jni-JoMRBDGAkaPdAt0m3gdq1QB-rSAr3YtS0hhDWqPSyHv3fnqMHxrtLpUOcV6u85N4uryLcQ_EMOlbZ-krnnmhjSxgvEN6TO054Zaox2wn5l1EmgTsY08QylPeD_uLIlzkucdF9PzQP7RZAQPXOPTQJ2qlVRoATHe4RtTwBJNNG2R92xQ6XHDNUyc_tYLzmsSTTuUgLhCjqlTpjnRZCzJI8aQzq5LzfUtt_DOP_fsUulXZa-RmDHQz1OB7Yd6jYU2Urbp40"


token = requests.post("https://osu.ppy.sh/oauth/token",
                      params={"client_id": 19271, "client_secret": "aYIYEVy5XEPPoheQHSsKC2HPD6wjBQVfTz39RN6G", "redirect_uri": "https://osunorway.vercel.app/", "grant_type": "client_credentials", "scope": "public"})

print(token.status_code)


userinfo = requests.get("https://osu.ppy.sh/api/v2/beatmaps/14/scores/users/12", headers={
                        "Authorization": f"Bearer {bearer_token}"})
print(userinfo.text)
