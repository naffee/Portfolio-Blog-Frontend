---
title: "Build a Discord Slash Command Bot"
category: "Tutorial"
tags: ["Discord API", "Node.js", "Tutorial", "Developer Onboarding"]
imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000"
featured: false
slug: "discord-slash-command-bot"
description: "A step-by-step onboarding tutorial for developers building their first Discord bot using the official quickstart."
links: []
---

## Introduction

Discord is home to millions of developers building bots to enhance communities. However, setting up a bot from scratch involves several moving parts: managing applications, configuring secure tokens, and setting up webhooks to handle real-time interactions.

This tutorial walks you through building your first Discord Slash Command Bot using Discord's modern **HTTP Interactions** approach. Instead of keeping a persistent connection open (which can be resource-intensive), Discord will send HTTP requests to your bot whenever a user interacts with it. 

By the end of this guide, you will have a working bot running locally that can respond to a slash command.

## Prerequisites

Before diving in, ensure you have the following:
- A [Discord account](https://discord.com/).
- A Discord server (guild) where you have the "Manage Server" permission (creating your own testing server is highly recommended).
- [Node.js](https://nodejs.org/) installed on your machine.
- [ngrok](https://ngrok.com/) installed. We will use ngrok to expose your local development server to the internet so Discord can communicate with it.

---

## Step 0: Project Setup

Instead of starting completely from scratch, we will use Discord's official sample application. This template is a pre-configured Node.js app using Express. It takes care of the boilerplate code required to verify that incoming requests are genuinely coming from Discord.

1. Open your command line and clone the sample project:
```bash
git clone https://github.com/discord/discord-example-app.git
```
2. Navigate into the new directory and install the necessary dependencies:
```bash
cd discord-example-app
npm install
```

---

## Step 1: Creating an App

Your Discord application acts as the top-level container for your bot. It holds all your settings, credentials, and configuration.

1. Navigate to the [Discord Developer Portal](https://discord.com/developers/applications) and click **New Application**.
2. Give your application a name and click **Create**.

### Fetching your credentials

Your app needs certain credentials to securely communicate with Discord. Back in your project folder, rename the `.env.sample` file to `.env`. 

We need three specific values from your Developer Portal:
1. **Application ID:** Found on the **General Information** page. This is the unique identifier for your app.
2. **Public Key:** Also found on the **General Information** page. This key is crucial—your app uses it to cryptographically verify that incoming HTTP requests are actually sent by Discord.
3. **Bot Token:** Found on the **Bot** page. Click **Reset Token** to generate a new one. This token acts as the password for your bot, allowing it to take actions in Discord.

Replace the placeholders in your `.env` file with these copied values.

> [!WARNING]
> **Keep your Token secret!** Your token grants full access to your bot. Never commit your `.env` file to a public GitHub repository or share the token with anyone.

---

## Step 2: Configuring Installation & Permissions

Before you can invite the bot to your server, you need to define *how* and *where* it can be installed, and *what* it is allowed to do.

### Choosing Installation Contexts

**Installation contexts** determine where your app lives. 
- **Server Context (Guild Install):** The app is installed to a specific server. It can be used by anyone in that server, but requires a server admin to install it.
- **User Context (User Install):** The app is installed directly to a user's profile. That user can trigger the bot's commands anywhere in Discord, including DMs.

On the left sidebar, click **Installation**. Under **Installation Contexts**, ensure both **User Install** and **Guild Install** are selected so we can test both methods.

### Adding Scopes and Bot Permissions

When an app is installed, it requests certain access rights.
- **Scopes** dictate the high-level data and features the app can access. To use slash commands, your app needs the `applications.commands` scope.
- **Permissions** are the granular, server-level abilities your bot has (like `Send Messages` or `Manage Roles`).

Scroll down to **Default Install Settings**:
1. For **User Install**, add the `applications.commands` scope.
2. For **Guild Install**, add the `applications.commands` scope and the `bot` scope. 
3. When you select the `bot` scope, a Permissions checklist will appear. Select the permissions your bot will need (for basic commands, no extra permissions are strictly necessary, but `Send Messages` is standard).

### Installing Your App

Still on the **Installation** page, select **Discord Provided Link** under the Install Link section. 
1. Copy the generated URL.
2. Paste it into your browser.
3. Select your testing server from the dropdown to install the bot to the server.
4. You can also choose to install the bot to your personal account.

---

## Step 3: Connecting Your Local Server to Discord

Because we are using HTTP Interactions, Discord needs a public URL to send data to whenever someone types your slash command. Since your code is running locally on your computer, it doesn't have a public URL yet. We will use **ngrok** to bridge this gap by creating a secure tunnel.

### Starting your app and ngrok
1. In your terminal, start your local node server:
```bash
npm run start
```
2. Open a *second* terminal window and start ngrok on port 3000 (the default port for the sample app):
```bash
ngrok http 3000
```
3. Ngrok will output a secure forwarding URL that looks something like `https://1234-abcd.ngrok-free.app`. Copy this URL.

### Setting the Interactions Endpoint URL
1. Go back to your app's **General Information** page in the Developer Portal.
2. Find the **Interactions Endpoint URL** field.
3. Paste your ngrok URL here, and append `/interactions` to the end. It should look like this: `https://1234-abcd.ngrok-free.app/interactions`.
4. Click **Save Changes**. 

*Behind the scenes, Discord just sent a test ping to your app via ngrok. The sample app automatically verified the ping using your Public Key and responded successfully!*

---

## Step 4: Testing Your Command

The sample application comes with a pre-registered command called `/test`. 

1. Open your Discord server where you installed the bot.
2. Type `/test` in the chat box and press Enter.
3. In your first terminal window, you will see the incoming request logged.
4. In Discord, your bot will instantly reply with a predefined message!

Congratulations! You have successfully configured a modern Discord application, established a secure HTTP tunnel, and handled a slash command interaction.

---

## Troubleshooting

- **Endpoint Validation Failed:** If you get an error when saving the Interactions Endpoint URL, ensure your local node server (`npm run start`) and ngrok are both running simultaneously in two separate terminals. Also, double-check that you appended `/interactions` to the ngrok URL.
- **Invalid Token Error:** Ensure you copied the bot token from the **Bot** page, and not the application's Client Secret.
- **Command Not Showing Up:** Global commands can sometimes take time to sync. If you don't see `/test`, ensure you invited the bot using the proper install link containing the `applications.commands` scope.
