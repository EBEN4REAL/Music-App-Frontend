import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { MdPlayArrow } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { MdExplicit } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";

import { trimString, trackTime } from '../../helper/helper'

class All extends Component {
    showPlayButton = (number, button, icon, plIcon, index) => {
        number.style.display = 'none'
        button.style.backgroundColor = 'black'
        button.style.display = 'flex'
        button.style.alignItems = 'center'
        button.style.justifyContent = 'center'
        if (!this.props.loggedIn) {
            icon.style.display = 'block';
            icon.style.position = 'relative'
            plIcon.style.display = 'none';
            return
        }
        if (this.props.availableTracks[index] !== true) {
            icon.style.display = 'block';
            icon.style.position = 'relative'
            plIcon.style.display = 'none';
        } else {
            icon.style.display = 'none';
            plIcon.style.display = 'block';
            plIcon.style.position = 'relative'
        }
    }

    hidePlayButton = (number, button, icon, plIcon) => {
        number.style.display = 'block'
        button.style.backgroundColor = 'white'
        number.style.display = 'flex'
        number.style.justifyContent = 'center'
        number.style.width = '30px';
        icon.style.display = 'none';
        plIcon.style.display = 'none'
    }

    showIcon = (clas, secClas) => {
        this.props.showIcon(clas, secClas)
    }

    hideIcon = (clas, secClas) => {
        this.props.hideIcon(clas, secClas)
    }

    expandPlay = (clas) => {
        this.props.expandPlay(clas)
    }

    shrinkPlay = (clas) => {
        this.props.shrinkPlay(clas)
    }

    expandLike = (clas) => {
        this.props.expandLike(clas)
    }

    shrinkLike = (clas) => {
        this.props.shrinkLike(clas)
    }

    play = (type, id) => {
        this.props.play(type, id)
    }

    addAlbPl = (type, id, trackId, index) => {
        this.props.addAlbPl(type, id, trackId, index)
    }

    removeAlbPl = (id, trackId, index) => {
        this.props.removeAlbPl(id, trackId, index)
    }

    addToLikes = (type, obj, clas) => {
        this.props.addToLikes(type, obj, clas)
    }

    addToLikes2 = (type, obj, clas, classs) => {
        this.props.addToLikes2(type, obj, clas, classs)
    }

    newLikes = (value, type) => {
        return this.props.newLikes(value, type)
    }

    likeUndownloadAction = (type, obj, action) => {
        this.props.likeUndownloadAction(type, obj, action)
    }

    login = () => {
        this.props.history.push(`/login?redirect_link=${this.props.path}/${this.props.match.params.query}`)
    }

    topArtist = (artist) => {
        const artistLower = artist.toLowerCase()
        const query = this.props.match.params.query.toLowerCase()
        if (artistLower === query || artistLower.includes(query)) {
            return true
        }
        // return artistLower === query || artistLower.includes(query)
    }

    render() {
        const { loggedIn, path } = this.props
        const { tracks, albums, artists, playlists, topResults } = this.props.searchResult
        this.trackLike = []
        this.trackNumber = []
        this.playSong = []
        this.addIcon = []
        this.addIconPl = []
        this.albumLike = []
        this.albumImage = []
        this.playlistLike = []
        this.playlistImage = []
        this.playAlbum = []
        this.playPlaylist = []
        this.artistLike = []
        this.artistImage = []

        return (
            <div>
                {topResults.artist && this.topArtist(topResults.artist.name) ? <div className="top_search_result">
                    <p className="discography_header_text">Top Results</p>
                    <div className="top_search_image_holder">
                        <Link to={`/${topResults.artist.type}/${topResults.artist.id}`}>
                            <img src={topResults.artist.picture_medium} className="top_search_image" alt="artist cover" />
                        </Link>
                        <Link to={`/${topResults.artist.type}/${topResults.artist.id}`} style={{ textDecoration: 'none' }}>
                            <p className="top_search_image_text turn_red mobile_reduce_margin">{topResults.artist.name}</p>
                        </Link>
                    </div>
                </div> : ''}

                {topResults.album && this.topArtist(topResults.album.title) ? <div className="top_search_result">
                    <p className="discography_header_text">Top Results</p>
                    <div className="top_search_image_holder">
                        <Link to={`/${topResults.album.type}/${topResults.album.id}`}>
                            <img src={topResults.album.cover_medium} className="top_search_album_image" alt="artist cover" />
                        </Link>
                        <Link to={`/${topResults.album.type}/${topResults.album.id}`} style={{ textDecoration: 'none' }}>
                            <p className="top_search_image_text turn_red">{topResults.album.title}</p>
                        </Link>
                    </div>
                </div> : ''}

                {tracks.length ? <div className="top_search_result search_tracks remove_search_border">
                    <p className="discography_header_text">Tracks</p>
                    <div className="tracks_mobile_display">{tracks.map((track, index) => {
                        if (index < 6) {
                            return (
                                <div className="tracks_header tracks_header_background remove_search_border_top" key={index} onMouseOver={() => this.showPlayButton(this.trackNumber[index], this.playSong[index], this.addIcon[index], this.addIconPl[index], index)} onMouseOut={() => this.hidePlayButton(this.trackNumber[index], this.playSong[index], this.addIcon[index], this.addIconPl[index])}>
                                    <div className="track_number">
                                        <div className="u" ref={el => this.trackNumber[index] = el}>
                                            {/* <p style={{ marginBottom: '0' }}>{index + 1}</p> */}
                                            <img src={track.album.cover} alt="small album cover" style={{ width: '30px', height: '30px', borderRadius: '5px' }} />
                                        </div>
                                        <div className="play_track_button" ref={el => this.playSong[index] = el} onClick={() => { loggedIn ? this.play('tracks', track.id) : this.login() }}>
                                            <MdPlayArrow style={{ fontSize: '25px', color: 'white' }} />
                                        </div>
                                        <div onClick={() => loggedIn ? this.addToLikes(track.type, track, this.trackLike[index]) : this.login()} ref={el => this.trackLike[index] = el} className={`track_like_holder ${loggedIn ? (this.newLikes(track, 'trackLikes') ? 'is_liked' : 'is_unliked') : ''}`}>

                                            <IoIosHeart className={!loggedIn ? 'hide' : (this.newLikes(track, 'trackLikes') ? 'track_liked' : 'hide')} id="liked_track" />
                                            <IoMdHeartEmpty className={!loggedIn ? 'show' : (this.newLikes(track, 'trackLikes') ? 'hide' : 'track_not_liked')} id="unliked_track" />
                                        </div>
                                    </div>
                                    <div className="track_title">
                                        <p style={{ width: '70%' }}>{trimString(track.title, 27)}</p>
                                        <div className="add_icon_holder">
                                            <div ref={el => this.addIcon[index] = el} className="add_library_icon" onClick={() => { loggedIn ? this.addAlbPl(path, track.album.id, track.id, index) : this.login() }}>
                                                <IoIosAddCircleOutline className="add_icons_play" />
                                                <span className="tooltiptext">Add to library</span>
                                            </div>
                                            <div ref={el => this.addIconPl[index] = el} className="add_library_icon" onClick={() => { loggedIn ? this.removeAlbPl(track.album.id, track.id, index) : this.login() }}>
                                                <IoIosRemoveCircleOutline className="add_icons_play" />
                                                <span className="tooltiptext">Remove from library</span>
                                            </div>
                                        </div>
                                        <div style={{ width: '10%' }}>
                                            {track.explicit_lyrics ? <MdExplicit /> : ''}
                                        </div>
                                    </div>
                                    <Link to={`/${track.artist.type}/${track.artist.id}`} className="track_artist" style={{ textDecoration: 'none' }}><p className="turn_red">{trimString(track.artist.name, 17)}</p></Link>

                                    <Link to={`/${track.album.type}/${track.album.id}`} className="track_album" style={{ textDecoration: 'none' }}><p className="turn_red">{trimString(track.album.title, 17)}</p></Link>
                                    <p className="track_duration">{trackTime(track.duration)}</p>
                                </div>
                            )
                        } else { return '' }
                    })}</div>
                </div> : ''}


                {albums.length ? <div className="top_search_result search_tracks remove_search_border">
                    <p className="discography_header_text">Albums</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }} className="mobile_albart_display">
                        {albums.map((cur, index) => {
                            if (index < 5) {
                                return (
                                    <div className="explore_artist mobile_artist_album_image" id="discography_playlist_mapped" key={index}>
                                        <div className="explore_albums_images_holder mobile_artist_album_image" onMouseOver={() => this.showIcon(this.albumLike[index], this.albumImage[index])} onMouseOut={() => this.hideIcon(this.albumLike[index], this.albumImage[index])}>
                                            <Link to={`/${cur.type}/${cur.id}`}>
                                                <img src={cur.cover_medium} ref={el => this.albumImage[index] = el} alt="album cover" className="explore_albums_images mobile_artist_album_image" />
                                            </Link>
                                            <div className="play_holder" ref={el => this.playAlbum[index] = el} onClick={() => { loggedIn ? this.play('album', cur.id) : this.login() }} onMouseOver={() => this.expandPlay(this.playAlbum[index])} onMouseOut={() => this.shrinkPlay(this.playAlbum[index])}>
                                                <MdPlayArrow style={{ fontSize: '25px' }} />
                                            </div>
                                            <div
                                                className={!loggedIn ? 'favourite_album_holder white_favourite' : (this.newLikes(cur, 'albumLikes') ? 'favourite_album_holder red_favourite' : 'favourite_album_holder white_favourite')}
                                                ref={el => this.albumLike[index] = el}
                                                onMouseOver={() => this.expandLike(this.albumLike[index])} onMouseOut={() => this.shrinkLike(this.albumLike[index])}
                                                onClick={() => loggedIn ? this.addToLikes2(cur.type, cur, this.albumLike[index], "favourite_album_holder") : this.login()}
                                            >
                                                <FaRegHeart />
                                            </div>
                                        </div>
                                        <Link to={`/${cur.type}/${cur.id}`} style={{ textDecoration: 'none' }}>
                                            <p className="explore_artists_name turn_red" style={{ textAlign: 'center' }}>{trimString(cur.title, 17)}</p>
                                        </Link>
                                    </div>

                                )
                            } else { return '' }
                        })}
                    </div>
                </div> : ''}

                {artists.length ? <div className="top_search_result search_tracks remove_search_border">
                    <p className="discography_header_text">Artists</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }} className="mobile_albart_display">
                        {artists.map((cur, index) => {
                            if (index < 5) {
                                return (
                                    <div className="explore_artist mobile_artist_album_image" id="discography_playlist_mapped" key={index}>
                                        <div className="explore_artists_images_holder mobile_artist_album_image" onMouseOver={() => this.showIcon(this.artistLike[index], this.artistImage[index])} onMouseOut={() => this.hideIcon(this.artistLike[index], this.artistImage[index])}>
                                            <Link to={`/${cur.type}/${cur.id}`}>
                                                <img src={cur.picture_medium} alt="artist cover" ref={el => this.artistImage[index] = el} className="explore_artists_images mobile_artist_album_image" />
                                            </Link>
                                            <div
                                                className={!loggedIn ? 'favourite_holder white_favourite' : (this.newLikes(cur, 'artistLikes') ? 'favourite_holder red_favourite' : 'favourite_holder white_favourite')}
                                                ref={el => this.artistLike[index] = el}
                                                onMouseOver={() => this.expandLike(this.artistLike[index])} onMouseOut={() => this.shrinkLike(this.artistLike[index])}
                                                onClick={() => loggedIn ? this.addToLikes2(cur.type, cur, this.artistLike[index], "favourite_holder") : this.login()}
                                            >
                                                <FaRegHeart />
                                            </div>
                                        </div>
                                        <Link to={`/${cur.type}/${cur.id}`} style={{ textDecoration: 'none' }}>
                                            <p className="explore_artists_name turn_red" style={{ cursor: 'pointer', textAlign: 'center' }}>{trimString(cur.name, 17)}</p>
                                        </Link>
                                    </div>
                                )
                            } else { return '' }
                        })}
                    </div>
                </div> : ''}


                {playlists.length ? <div className="top_search_result search_tracks remove_search_border">
                    <p className="discography_header_text">Playlists</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }} className="mobile_albart_display">
                        {playlists.map((cur, index) => {
                            if (index < 5) {
                                return (
                                    <div className="explore_artist mobile_artist_album_image" id="discography_playlist_mapped" key={index}>
                                        <div className="explore_albums_images_holder mobile_artist_album_image" onMouseOver={() => this.showIcon(this.playlistLike[index], this.playlistImage[index])} onMouseOut={() => this.hideIcon(this.playlistLike[index], this.playlistImage[index])}>
                                            <Link to={`/${cur.type}/${cur.id}`}>
                                                <img src={cur.picture_medium} ref={el => this.playlistImage[index] = el} alt="playlist cover" className="explore_albums_images mobile_artist_album_image" />
                                            </Link>
                                            <div className="play_holder" ref={el => this.playPlaylist[index] = el} onClick={() => { loggedIn ? this.play('playlist', cur.id) : this.login() }} onMouseOver={() => this.expandPlay(this.playPlaylist[index])} onMouseOut={() => this.shrinkPlay(this.playPlaylist[index])}>
                                                <MdPlayArrow style={{ fontSize: '25px' }} />
                                            </div>
                                            <div
                                                className={!loggedIn ? 'favourite_album_holder white_favourite' : (this.newLikes(cur, 'playlistLikes') ? 'favourite_album_holder red_favourite' : 'favourite_album_holder white_favourite')}
                                                ref={el => this.playlistLike[index] = el}
                                                onMouseOver={() => this.expandLike(this.playlistLike[index])} onMouseOut={() => this.shrinkLike(this.playlistLike[index])}
                                                onClick={() => loggedIn ? this.addToLikes2(cur.type, cur, this.playlistLike[index], "favourite_album_holder") : this.login()}
                                            >
                                                <FaRegHeart />
                                            </div>
                                        </div>
                                        <Link to={`/${cur.type}/${cur.id}`} style={{ textDecoration: 'none' }}>
                                            <p className="explore_artists_name turn_red">{trimString(cur.title, 17)}</p>
                                        </Link>
                                    </div>
                                )
                            } else { return '' }
                        })}
                    </div>
                </div> : ''}
            </div>
        )
    }
}

export default All