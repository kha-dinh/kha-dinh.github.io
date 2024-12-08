---
layout: post
title: "GitJournal: The missing piece to my note taking workflow"
date: 2024-12-07 14:22:00
description: How GitJournal solves the need for accessing my zk notes on the go.
tags: note-taking
categories: blog
giscus_comments: true
related_posts: false
---

## Some Background

I have been using [zk](https://github.com/zk-org/zk) for taking notes in plain
markdown. While it lacks features compared to the well-known Obsidian, I prefer
it over tools like Obsidian for the following reasons:

- Using your preferred editor is possible. I am an avid
  [Neovim](https://neovim.io/) user and would prefer to do all of my writing
  with Vim key bindings if possible. I like it so much that I even created a
  [language server](https://github.com/kha-dinh/bibli-ls) to support BibTeX
  citations in my notes.

- Terminal-first workflow. zk's nice [fzf](https://github.com/junegunn/fzf)
  integration allows me to access my notes with just a single keyboard shortcut.
  This enables me to avoid using a mouse in general.

- Lightweight design. I like that zk provides the bare minimum tools for looking
  up your notes and providing editor-agnostic diagnostics highlighting through
  its LSP protocol. This enables me to quickly set up the note-taking workflow
  on any new desktop.

For maintaining my notes, I have a private GitHub repo that I regularly push to.
I prefer this to cloud synchronization due to its simplicity.

## Complaints

One of the pet peeves I have with the terminal + git workflow is that it is
fundamentally difficult to **synchronize** and **access** your notes on mobile
devices. All available options are not ideal.

For synchronization:

- Upload your notes to a cloud service and use
  [syncthing](https://syncthing.net/) to automatically synchronize. This means
  you must keep your notes in two places.

For reading/editing:

- Using a terminal emulator like [termux](https://termux.dev/en/). A keyboard is
  required which is only sometimes available on the go, and setting up is still
  a hassle.
- Directly accessing your notes through GitHub's web interface. This results in
  a terrible editing experience.

In contrast, Obsidian has a dedicated [mobile app](https://obsidian.md/mobile)
that streamlines the experience on both desktop and mobile phones. Obsidian
users might use Obsidian's cloud service or the Obsidian git plugin to maintain
their notes.

## GitJournal

Recently, I encountered the
[GitJournal](https://github.com/GitJournal/GitJournal) mobile application that
solves the aforementioned issues. It simplifies notes synchronization and
editing into a single mobile app:

- Markdown preview/editing support. The app prioritizes support for markdown
  notes in plaintext.
- Simplified git synchronization at the push of a button.
- _Links between notes work_! I can just press on a link, e.g., `[[AkgiO4ax]]`,
  to visit the note. This is partly thanks to zk's use of the file name (a
  random UUID) as notes link.

While there are still a few minor issues, I can live with them:

- The pricing for pro features is a bit steep, so I need some time to decide if
  it's worth it.
- Note UUID generation scheme doesn't match with my zk's note ID system. Still,
  I can edit them when I get to my desktop.

## Conclusion

GitJournal has filled a crucial gap in my note-taking system, allowing me to
maintain the terminal-first, git-based workflow I love on the desktop while
gaining seamless mobile access. It proves that we don't always need to
compromise between power-user preferences and mobile convenience. For those who
prefer lightweight, text-based note-taking tools like zk but want better mobile
integration, GitJournal offers an elegant solution that respects the simplicity
and flexibility of plain markdown files while making them accessible on the go.
