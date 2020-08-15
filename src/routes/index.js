import React from "react"
import { Redirect } from "react-router-dom"

import BlankLayout from "../layout/blank"
import HomeLayout from "../layout/home"
import Discover from "../pages/discover"
import Video from "../pages/video"
import Mine from "../pages/mine"
import Friend from "../pages/friend"
import Daily from "../pages/daily"
import SongList from "../pages/songlist"
import Rank from "../pages/rank"
import Search from "../pages/search"
import Singer from "../pages/singer"

import SongListDetail from "../components/songlist"
import SongListInfo from "../components/songlist/info"

const routes = [
	{
		component: BlankLayout,
		routes: [
			{
				path: "/",
				component: HomeLayout,
				routes: [
					{
						path: "/",
						exact: true,
						render: () => <Redirect to={"/discover"} />,
					},
					{
						path: "/discover",
						component: Discover,
					},
					{
						path: "/video",
						component: Video,
					},
					{
						path: "/mine",
						component: Mine,
					},
					{
						path: "/friend",
						component: Friend,
					},
					{
						path: "/daily",
						component: Daily,
					},
					{
						path: "/songlist",
						component: SongList,
					},
					{
						path: '/list_detail/:id',
						component: SongListDetail
					},
					{
						path: '/list_info/:id',
						component: SongListInfo
					},
					{
						path: "/rank",
						component: Rank,
					},
					{
						path: '/search',
						component: Search
					},
					{
						path: '/singer',
						component: Singer
					}
				],
			},
		],
	},
]

export default routes
