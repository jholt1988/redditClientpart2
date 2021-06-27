import React, { useEffect } from "react";
import { fetchSubreddits, selectSubreddits } from "../../store/subredditSlice";
import {
  setSelectedSubreddit,
  selectedSubreddit
} from "../../store/redditSlice";
import { useDispatch, useSelector } from "react-redux";
import Card from '../../componets/Card'

export const Subreddits = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubreddits);

  useEffect(() => {
    dispatch(fetchSubreddits())
  }, [dispatch]);

  return (
    <Card className="Subreddits-Card">
      <h2>Subreddits</h2>
      <ul className='Subreddit-List'>
          {subreddits.map((subreddit) => (
            <li 
              key={subreddit.id}
              className={`${
                selectedSubreddit === subreddit.url && `selected-Subreddit`}`}
            >
            <button 
             type="button"
             onClick={() => dispatch(setSelectedSubreddit(subreddit.url))} >
            
             <img src={subreddit.icon_img} alt={`${subreddit.display_name}`} className='subreddit_icon'/>
              {subreddit.display_name}
              </button>
              </li>
          ))}
      </ul>
    </Card>
  )
};

export default Subreddits