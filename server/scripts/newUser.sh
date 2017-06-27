#!/bin/bash

curl -H "Content-Type: application/json" -X POST -d '{
		"password": "1122312",
		"username": "Phillip Jie",
		"email": "jieyifei@hotmail.com"
	}' http://localhost:3000/api/auth/register
