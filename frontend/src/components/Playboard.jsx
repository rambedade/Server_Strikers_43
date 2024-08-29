import React from 'react'
import '../Styles/playboard.css'
import { FaArrowDown, FaArrowLeft, FaArrowRight, FaArrowUp, FaRegStar, FaStar } from "react-icons/fa";
import { GiPodiumWinner } from "react-icons/gi";

const player_url = "https://media.istockphoto.com/id/1195743934/vector/cute-panda-character-vector-design.jpg?s=612x612&w=0&k=20&c=J3ht-bKADmsXvF6gFIleRtfJ6NGhXnfIsrwlsUF8w80="

const Playboard = () => {
  return (
    <div className='container board'>

        <div className="player_1">
            <img src={player_url} alt="player" />
            <p>Player Name</p>
            <div className='dice'></div>
        </div>
        <div className="player_2">
            <img src={player_url} alt="player" />
            <p>Player Name</p>
            <div className='dice'></div>
        </div>
        <div className="player_3">
            <img src={player_url} alt="player" />
            <p>Player Name</p>
            <div className='dice'></div>
        </div>
        <div className="player_4">
            <img src={player_url} alt="player" />
            <p>Player Name</p>
            <div className='dice'></div>
        </div>

      <div className='board_grid'>
        <div className='red_box'>
            <div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        
        <div className='green_mid'>
            <div></div>
            <div className='down_icon'>
                <FaArrowDown />
            </div>
            <div></div>
            <div></div>
            <div className='green'></div>
            <div className='green star_fill'>
                <FaStar />
            </div>
            <div className='star'>
                <FaRegStar />
            </div>
            <div className='green'></div>
            <div></div>
            <div></div>
            <div className='green'></div>
            <div></div>
            <div></div>
            <div className='green'></div>
            <div></div>
            <div></div>
            <div className='green'></div>
            <div></div>
        </div>

        <div className='green_box'>
            <div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>

        <div className='red_mid'>
            <div></div>
            <div className='red star_fill'>
                <FaStar />
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div className='right_arrow'>
                <FaArrowRight />
            </div>
            <div className='red'></div>
            <div className='red'></div>
            <div className='red'></div>
            <div className='red'></div>
            <div className='red'></div>
            <div></div>
            <div></div>
            <div className='star'>
                <FaRegStar />
            </div>
            <div></div>
            <div></div>
            <div></div>
        </div>

        <div className='center_grid'>
            <GiPodiumWinner />
        </div>

        <div className='yellow_mid'>
            <div></div>
            <div></div>
            <div></div>
            <div className='star'>
                <FaRegStar />
            </div>
            <div></div>
            <div></div>
            <div className='yellow'></div>
            <div className='yellow'></div>
            <div className='yellow'></div>
            <div className='yellow'></div>
            <div className='yellow'></div>
            <div className='left_arrow'>
                <FaArrowLeft />
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div className='yellow star_fill'>
                <FaStar />
            </div>
            <div></div>
        </div>

        <div className='blue_box'>
            <div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>

        <div className='blue_mid'>
            <div></div>
            <div className='blue'></div>
            <div></div>
            <div></div>
            <div className='blue'></div>
            <div></div>
            <div></div>
            <div className='blue'></div>
            <div></div>
            <div></div>
            <div className='blue'></div>
            <div className='star'>
                <FaRegStar />
            </div>
            <div className='blue star_fill'>
                <FaStar />
            </div>
            <div className='blue'></div>
            <div></div>
            <div></div>
            <div className='up_arrow'>
                    <FaArrowUp />
            </div>
            <div></div>
        </div>

        <div className='yellow_box'>
            <div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>

      </div>
    </div>
  )
}

export default Playboard;
