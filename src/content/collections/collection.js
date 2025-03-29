import React, { useState, useEffect } from "react";
import AWS from "aws-sdk";
import { useNavigate } from "react-router-dom";
import "../content.css";

const Collections = () => {
  const [bucketContent, setBucketContent] = useState([]);
  const [originalContent, setOriginalContent] = useState([]);
  const navigate = useNavigate();

  const viewClick = (fileUrl, title, username) => {
    localStorage.setItem("fileUrl", fileUrl);
    localStorage.setItem("title", title);
    localStorage.setItem("username", username);

    navigate("/view/viewerstyled"); // Ensure this route is correctly defined in your Router setup
  };

  const handleSortGenre = (genre) => {
    const filteredItems = originalContent.filter(
      (item) => item.genre === genre
    );

    setBucketContent(filteredItems);
    if (!filteredItems.length) {
      alert("Sorry, nothing to show!");
    }
  };

  useEffect(() => {
    const fetchBucketData = async () => {
      const s3 = new AWS.S3({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        region: "ca-central-1",
      });

      const params = { Bucket: "starbucketcomic" 
      };

      try {
        const { Contents } = await s3.listObjectsV2(params).promise();
        const results = await Promise.all(
          Contents.map(async (object) => {
            const objectParams = {
              Bucket: params.Bucket,
              Key: object.Key,
            };
            const data = await s3.headObject(objectParams).promise();
            return {
              key: object.Key,
              fileUrl: `https://${params.Bucket}.s3.ca-central-1.amazonaws.com/${object.Key}`,
              title: data.Metadata.title,
              genre: data.Metadata.genre,
              completed: data.Metadata.completed,
              username: data.Metadata.username,
              chapter: data.Metadata.chapter,
            };
          })
        );

        const onlyChapterOne = results.filter((item) => item.chapter == "1");
        setBucketContent(onlyChapterOne);
        setOriginalContent(onlyChapterOne);
        console.log(typeof results.chapter);
      } catch (err) {
        console.error("Error fetching data from S3:", err);
        alert("Failed to fetch data. Please try again later.");
      }
    };

    fetchBucketData();
  }, []);

  return (
    <div className="row" style={{ width: "110%" }}>
      {["romance", "comedy", "adventure", "illustration", "truestory"].map(
        (genre) => (
          <button key={genre} onClick={() => handleSortGenre(genre)}>
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </button>
        )
      )}
      {bucketContent.map((item) => (
        <div className="col-md-3 mb-3" key={item.key}>
          <div className="content-box">
            <img
              src={item.fileUrl}
              alt={item.title}
              className="image-display"
            />
            <h2>{item.title}</h2>
            <p>Genre: {item.genre}</p>
            <p>Completed: {item.completed}</p>
            <p>User: {item.username}</p>
            <p>Chapter: {item.chapter}</p>
            <button
              onClick={() => viewClick(item.fileUrl, item.title, item.username)}
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Collections;
