import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
    // State for managing anime lists
    const [trendingAnime, setTrendingAnime] = useState(() => {
        const saved = localStorage.getItem('trendingAnime');
        return saved ? JSON.parse(saved) : ['Attack on Titan', 'Jujutsu Kaisen', 'Demon Slayer'];
    });

    const [watchlist, setWatchlist] = useState(() => {
        const saved = localStorage.getItem('watchlist');
        return saved ? JSON.parse(saved) : ['My Hero Academia', 'One Piece', 'Tokyo Revengers'];
    });

    const [recommendations, setRecommendations] = useState(() => {
        const saved = localStorage.getItem('recommendations');
        return saved ? JSON.parse(saved) : ['Death Note', 'Fullmetal Alchemist: Brotherhood', 'Steins;Gate'];
    });

    // State for input fields
    const [newTrendingAnime, setNewTrendingAnime] = useState('');
    const [newWatchlistItem, setNewWatchlistItem] = useState('');
    const [newRecommendation, setNewRecommendation] = useState('');

    // Function to add a new anime
    const addAnime = (list, setList, newItem, storageKey) => {
        if (newItem.trim()) {
            setList((prevList) => {
                const updatedList = [...prevList, newItem]; // Use the passed list directly
                localStorage.setItem(storageKey, JSON.stringify(updatedList)); // Update local storage
                return updatedList; // Return updated state
            });
            return ''; // Clear the input
        }
        return newItem; // Return unchanged input if empty
    };

    // Function to delete an item
    const deleteItem = (list, setList, index, storageKey) => {
        const updatedList = list.filter((_, i) => i !== index);
        setList(updatedList);
        localStorage.setItem(storageKey, JSON.stringify(updatedList)); // Update local storage
    };

    // Function to clear all data
    const clearAllData = () => {
        setTrendingAnime([]);
        setWatchlist([]);
        setRecommendations([]);
        localStorage.clear(); // Clear all local storage
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <p className="welcome-text">Welcome to your dashboard, weebs</p>
            <div className="card-container">
                {/* First Card: Anime is Lyf */}
                <div className="card">
                    <h2>Anime is Lyf</h2>
                    <iframe
                        className="video"
                        src="https://www.youtube.com/embed/Vq1OvGJKtTc"
                        title="YouTube video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ width: '100%', height: '500px' }} // Updated width and height
                    ></iframe>
                    <p>Watch your video above.</p>
                </div>

                {/* Second Card: Trending Anime */}
                <div className="card">
                    <h2>Trending Anime</h2>
                    <ul>
                        {trendingAnime.map((anime, index) => (
                            <li key={index}>
                                {anime}
                                <button 
                                    className="delete-button" 
                                    onClick={() => deleteItem(trendingAnime, setTrendingAnime, index, 'trendingAnime')}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                    <input 
                        type="text" 
                        value={newTrendingAnime} 
                        onChange={(e) => setNewTrendingAnime(e.target.value)} 
                        placeholder="Add new trending anime" 
                    />
                    <button onClick={() => setNewTrendingAnime(addAnime(trendingAnime, setTrendingAnime, newTrendingAnime, 'trendingAnime'))}>
                        Add
                    </button>
                </div>

                {/* Third Card: Your Watchlist */}
                <div className="card">
                    <h2>Your Watchlist</h2>
                    <ul>
                        {watchlist.map((item, index) => (
                            <li key={index}>
                                {item}
                                <button 
                                    className="delete-button" 
                                    onClick={() => deleteItem(watchlist, setWatchlist, index, 'watchlist')}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                    <input 
                        type="text" 
                        value={newWatchlistItem} 
                        onChange={(e) => setNewWatchlistItem(e.target.value)} 
                        placeholder="Add new watchlist item" 
                    />
                    <button onClick={() => setNewWatchlistItem(addAnime(watchlist, setWatchlist, newWatchlistItem, 'watchlist'))}>
                        Add
                    </button>
                </div>

                {/* Fourth Card: Recommendations */}
                <div className="card">
                    <h2>Recommendations</h2>
                    <ul>
                        {recommendations.map((item, index) => (
                            <li key={index}>
                                {item}
                                <button 
                                    className="delete-button" 
                                    onClick={() => deleteItem(recommendations, setRecommendations, index, 'recommendations')}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                    <input 
                        type="text" 
                        value={newRecommendation} 
                        onChange={(e) => setNewRecommendation(e.target.value)} 
                        placeholder="Add new recommendation" 
                    />
                    <button onClick={() => setNewRecommendation(addAnime(recommendations, setRecommendations, newRecommendation, 'recommendations'))}>
                        Add
                    </button>
                </div>
            </div>

            {/* Clear All Button */}
            <button onClick={clearAllData} style={{ marginTop: '20px' }}>
                Clear All
            </button>
        </div>
    );
};

export default Dashboard;















