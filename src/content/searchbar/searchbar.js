import React, { useState, useEffect } from "react";
import "../content.css";
import AWS from "aws-sdk";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [text, setText] = useState("");
  const [bucketContent, setBucketContent] = useState([]);
  const [originalState, setOriginalState] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const s3 = new AWS.S3({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: "ca-central-1",
    });

    const params = { Bucket: "starbucketcomic" };

    s3.listObjectsV2(params, (err, data) => {
      if (err) {
        console.error("Error listing objects:", err);
        return;
      }
      const getObjectMetadata = data.Contents.map((object) => {
        return s3
          .headObject({ Bucket: "starbucketcomic", Key: object.Key })
          .promise()
          .then((data) => ({
            key: object.Key,
            fileUrl: `https://starbucketcomic.s3.ca-central-1.amazonaws.com/${object.Key}`,
            title: data.Metadata.title || "No title", // Assuming titles might not exist
            chapter: data.Metadata.chapter,
            username: data.Metadata.username,
          }))
          .catch((err) => {
            console.error("Error getting metadata for key:", object.Key, err);
            return null;
          });
      });

      Promise.all(getObjectMetadata)
        .then((results) => {
          const filteredResults = results.filter((item) => item); // Remove nulls
          setBucketContent(filteredResults);
          setOriginalState(filteredResults);
        })
        .catch((err) => console.error("Error processing metadata:", err));
    });
  }, []);

  const search = () => {
    const searchContent = originalState.filter(
      (item) =>
        item.title.toLowerCase().includes(text.toLowerCase()) &&
        item.chapter === "1"
    );
    console.log(searchContent);
    navigate("/comic", { state: { searchContent } });
  };

  return (
    <div className="">
      <input
        type="text"
        value={text}
        placeholder="comic title"
        onChange={(e) => setText(e.target.value.toLowerCase())}
        style={{ width: "60%" }}
      />
      <button
        onClick={search}
        className={"submitButton"}
        disabled={text.length < 5}
      >
   
        submit
      </button>
    </div>
  );
};

export default SearchBar;
