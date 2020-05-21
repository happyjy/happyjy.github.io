---
title: PRACTICAL GIT
date: 2020-05-20
author: jyoon
category: studyList
tags:
  - git
  - practical
---

# fetch

| 동작                 | 명령어               |
| -------------------- | -------------------- |
| REPOSITORY fetch     | git fetch REPOSITORY |
| remote 전체 업데이트 | git fetch -all       |

# checkout

| 동작                                                            | 명령어                      |
| --------------------------------------------------------------- | --------------------------- |
| BRANCH NAME으로 branch 변경                                     | git checkout BRANCH NAME    |
| 현재 브랜치를 BRANCH NAME으로 브랜치 생성 후 만든 브랜치로 변경 | git checkout -b BRANCH NAME |

# branch

| 동작                                                                    | 명령어                                        |
| ----------------------------------------------------------------------- | --------------------------------------------- |
| 브랜치 제거                                                             | git branch -d BRANCH NAME                     |
| 강제로 브랜치를 제거                                                    | git branch -m NEW BRANCH NAME                 |
| branch rename                                                           | git branch -m OLD-BRANCH-NAME NEW-BRANCH-NAME |
| branch 목록 보기 - remote branch 보여준다.                              | git branch -r                                 |
| branch 목록 보기 - local, remote branch 보여준다                        | git branch -a                                 |
| branch 목록 보기 - head 커밋, sha1, 메세지를 보여준다.                  | git branch -v                                 |
| branch 목록 보기 - head 커밋, sha1, 메세지, upstream 브랜치를 보여준다. | git branch -vv                                |

# Rebase

- 현재 local branch에 있는 경우 master branch를 checkout한 이후에 생긴 remote branch(master branch) commit들이 생기고 그 다음 내가 commit 한 것들이 붙는다.

  - 아래 도표 참고

  ```
        A---B---C [local branch]
       /
  D---E---F---G [master branch]
  ```

  - 로컬 브랜치는 E commit 단계에서 생성, B, C Commit / master 브랜치에 F, G commit 생성
  - 이 단계에서 "git branch [master branch]" || "git branch [master branch][local branch]" 를 하면 아래와 같이 로컬 브렌치는 변경된다.

  ```
                A'--B'--C' [local branch]
               /
  D---E---F---G [master branch]
  ```

# rebase vs merge

[메커니즘 비교](https://commons.wikimedia.org/wiki/File:Mergevsrebase.png)

# commit

| 동작        | 명령어                         |
| ----------- | ------------------------------ |
| commit 방법 | git commit -m '메세지명'       |
| commit 취소 | git reset --soft [commit 위치] |

- commit 위치
  - head^은 현재 commit 하나를 의미
    즉 git reset --soft head^^은 현재 commit 기준 두개 commit 취소

# push

| 동작                                 | 명령어                        |
| ------------------------------------ | ----------------------------- |
| 현재 브랜치에 지정된 upstream에 push | git push                      |
| 원하는 브랜치에 push 하는 방법       | git push origin [BRANCH NAME] |

# cherry-pick

| 동작                                                                 | 명령어                      |
| -------------------------------------------------------------------- | --------------------------- |
| 다른 브렌치 commit sha의 이름을 현재 브랜치 다음에 commit 을 넣는다. | git cherry-pick [commitSha] |

# stash

| stash save MESSAGE                          | Message남기며 stash로 등록                                      |
| ------------------------------------------- | --------------------------------------------------------------- |
| git stash list                              | stash list 보기                                                 |
| git stash apply [stash@{1}]                 | stash 적용 후 stash list에서 유지                               |
| git stash pop [stash@{1}]                   | stash 적용 후 stash list에서 제거                               |
| git stash drop [git stash list의 number]    | 선택한 stash list number 를 제거한다.                           |
| git stash show [git stash list의 number] -p | options -p로 인해 stash된 파일을 모두 볼 수 있다.git stash show |
| [git stash list의 number] --name-only       | stash list number의 변경된 파일을 볼 수 있다.                   |

# rebase 받고 특정 remote branch에 push 하기

| 동작                                      | 명령어                                       |
| ----------------------------------------- | -------------------------------------------- |
| 현재 브랜치 stage로 변경                  | git checkout -b stage                        |
| remote branch update                      | git remote update \|\| git fetch BRANCH NAME |
| 현재 브랜치 update한 branch로 rebase 하기 | git rebase REMOTE BRANCH [LOCAL BRANCH]      |
| remote에 푸쉬                             | git push REMOTE BRANCH                       |

# 명령어 결과 파일로 만들기

- [git 명령어] > D:\diff1.text : dir에 파일 생성
