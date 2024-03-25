# Honkai Star Rail Auto Redeem Script

This script will running on [Render](https://render.com). It will automatically redeem the daily rewards for you. Please note that this script is not officially supported by **Mihoyo**. Follow the instructions below to set up the script.


1. [Docker](#%EF%B8%8F-docker)
2. [From source](#%EF%B8%8F-build-from-source)
## Docker
1. Go to [Render](https://render.com) and create a new web service.
2. Select deployment method as **Docker**.
3. Paste the following URL in the **Docker Image** field. [Docker Image](https://hub.docker.com/r/partridge1307/hsr-auto-redeem).
```
partridge1307/hsr-auto-redeem:tag
```
4. Set the **Environment Variables** as follows:
``` bash
SCRIPT_DISCORD_WEBHOOK=<Your Discord webhook token> # Optional
SCRIPT_USER_COOKIE_TOKEN_V2=<Your cookie_token_v2>
SCRIPT_USER_UID=<Your in-game uid>
SCIPT_USER_ACCOUNT_ID=<Your account_id>
```
5. You can use [Uptime](https://uptime.com/) to keep the service alive.

## Build from source
1. Clone this repository.
2. Install [Bun](https://bun.sh/).
3. Run the following command to build the project.
``` bash
bun start # Run the script
```
4. Deploy to your server and set the environment variables as mentioned above.
