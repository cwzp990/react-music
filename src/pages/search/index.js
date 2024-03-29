import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { api } from "../../api"
import { debounce } from "../../utils"
import { addPlay } from "../../store/actions"

import "./index.scss"

function Discover (props) {
	const { history } = props
	const [key, setKey] = useState("")
	const [hotKeys, setHotKeys] = useState([])
	const [result, setResult] = useState([])
	const { addPlayDispatch } = props

	const search_history = JSON.parse(localStorage.getItem("_search")) || []

	useEffect(() => {
		api.getHotKeys().then(resp => {
			if (resp.data.code === 200) {
				setHotKeys(resp.data.data)
			}
		})
	}, [])

	useEffect(() => {
		if (!key) {
			setResult([])
			return
		}
		const queryList = () => {
			api.getSearchResource(key).then(resp => {
				if (resp.data.code === 200) {
					setResult(resp.data.result.songs)
				}
			})
		}
		return debounce(queryList, 500)
	}, [key])

	const onBack = () => {
		history.goBack()
	}

	const goToSinger = () => {
		history.push('/singer')
	}

	const onEmpty = () => {
		localStorage.clear()
	}

	const onPlay = (id) => {
		api.getSongDetails(id).then(resp => {
			if (resp.data.code === 200) {
				let song = resp.data.songs[0]
				addPlayDispatch(song)
			}
		})
	}

	const onSearch = val => {
		setKey(val)
		const isHas = search_history.indexOf(val) > -1
		if (isHas) return
		search_history.push(val)
		localStorage.setItem("_search", JSON.stringify(search_history))
	}

	const onInput = e => {
		setKey(e.target.value)
	}

	const noSearch = (
		<div className="container">
			<div className="search-history">
				<p className="title">
					<span className="history">搜索历史</span>
					<i className="iconfont icon-empty" onClick={() => onEmpty()}></i>
				</p>
				<ul className="history-wrapper">
					{search_history.map((t, i) => (
						<li className="item-search" key={i}>
							{t}
						</li>
					))}
				</ul>
			</div>

			<div className="search-hot">
				<p className="hot">热搜榜</p>
				<ul className="hot-wrapper">
					{hotKeys.map((t, i) => (
						<li className="item-hot" key={i} onClick={() => onSearch(t.searchWord)}>
							<p className={i < 4 ? "index red" : "index"}>{i + 1}</p>
							<p className="main">
								<span>
									<em className="name">{t.searchWord}</em>
									<i className={t.iconType === 1 ? "icon-HOT iconfont red" : "icon-NEW iconfont blue"}></i>
								</span>
								<span className="sub more">{t.content}</span>
							</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	)

	const hasSearch = (
		<div className="m-search-list container">
			<p className="title">搜索 "{key}"</p>
			<ul className="result-wrapper">
				{result.map(i => (
					<li className="item-result" key={i.id} onClick={() => onPlay(i.id)} >
						<i className="iconfont icon-search"></i>
						{i.name}
					</li>
				))}
			</ul>
		</div>
	)

	return (
		<div className="m-search container">
			<div className="m-header">
				<div className="header-main">
					<input className="search-box" value={key} placeholder="随便搜搜吧┑(￣Д ￣)┍" onChange={onInput} />
					<i className="iconfont icon-search search"></i>
					<span className="cancel" onClick={onBack}>取消</span>
				</div>
				<div className="header-right">
					<i className="iconfont icon-person" onClick={goToSinger}></i>
				</div>
			</div>

			{result.length ? hasSearch : noSearch}
		</div>
	)
}

// 映射dispatch到props上
const mapDispatchToProps = dispatch => ({
	addPlayDispatch: song => {
		dispatch(addPlay(song))
	},
})

export default connect(null, mapDispatchToProps)(React.memo(Discover))
