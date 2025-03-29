import React, { useState, useEffect } from "react";
import AWS from "aws-sdk";
import { useNavigate } from "react-router-dom";
import "../content.css";
import View from "../view/view";

const ChooseChapter = () => {
  const [bucketContent, setBucketContent] = useState([]);
  const [file, setFile] = useState("");
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatedCollections, setUpdatedCollections] = useState([]);

  const navigate = useNavigate();
  const title = localStorage.getItem("title");
  const username = localStorage.getItem("username");
  const filelocal = localStorage.getItem("fileUrl");

  const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: "ca-central-1",
  });

  useEffect(() => {
    const fetchBucketData = async () => {
      const params = { Bucket: "starbucketcomic" };
      try {
        const { Contents } = await s3.listObjectsV2(params).promise();
        const results = await Promise.all(
          Contents.map(async (object) => {
            const objectParams = { Bucket: params.Bucket, Key: object.Key };
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

        const filterForTitle = results.filter(
          (item) => item.title === title && item.username === username
        );
        filterForTitle.sort((a, b) => a.chapter - b.chapter);

        setBucketContent(filterForTitle);
      } catch (err) {
        console.error("Error fetching data from S3:", err);
        alert("Failed to fetch data. Please try again later.");
      }
    };
    fetchBucketData();
  }, []);

  const chapterUrl = (url, title) => {
    alert(username);
    localStorage.setItem("title", title);
    localStorage.setItem("fileUrl", url);
    setFile(url);
  };

  const safeUsername = encodeURIComponent(username).replace(
    /[^a-zA-Z0-9-_]/g,
    ""
  );

  useEffect(() => {
    const fetchCollections = async () => {
      const params = {
        Bucket: "starbucketcomic",
        Prefix: `collections/${safeUsername}/`,
      };

      try {
        const data = await s3.listObjectsV2(params).promise();
        const keys = data.Contents.map((item) => item.Key);

        const collectionsData = await Promise.all(
          keys.map(async (key) => {
            const objParams = {
              Bucket: "starbucketcomic",
              Key: key,
            };
            const objData = await s3.getObject(objParams).promise();
            return JSON.parse(objData.Body.toString("utf-8"));
          })
        );

        setCollections(collectionsData);
        setUpdatedCollections(collectionsData);
      } catch (error) {
        console.error("Failed to fetch collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, [safeUsername, s3]);

  const addToCollection = async () => {
    console.log("addToCollection called");
    const exists = collections.some(
      (collection) => collection.fileUrl === filelocal && collection.title === title
    );

    if (exists) {
      const newCollection = { fileUrl: filelocal, title };

      // Check if the new fileUrl already exists in the updatedCollections
      const fileExistsInUpdatedCollections = updatedCollections.some(
        (collection) => collection.fileUrl === filelocal
      );

      if (!fileExistsInUpdatedCollections) {
        const updatedCollections = [...collections, newCollection];
        setUpdatedCollections(updatedCollections);

        const params = {
          Bucket: "starbucketcomic",
          Key: `collections/${safeUsername}/collection.json`,
          Body: JSON.stringify(updatedCollections),
          ContentType: "application/json",
        };

        try {
          await s3.putObject(params).promise();
          setCollections(updatedCollections);
          console.log("Successfully added to collection");
          alert('Successfully added to collection');
          console.log(JSON.stringify(updatedCollections));
        } catch (error) {
          console.error("Failed to add to collection:", error);
        }
      } else {
        console.log("File URL already exists in the updated collections");
        alert("File URL already exists in the updated collections");
      }
    } else {
      console.log("File URL already exists in the original collections");
      alert("File URL already exists in the original collections");
    }
  };

  return (
    <div>
      <button onClick={() => navigate("../../welcomelogin")}>
        Back to Search
      </button>

      <button onClick={addToCollection}>add collect</button>
      <div>
        {bucketContent.map((item, index) => (
          <button
            onClick={() => chapterUrl(item.fileUrl, item.title)}
            key={index}
          >
            {item.title} {item.chapter} {item.username}
          </button>
        ))}
      </div>
      {file ? <View fileUrl={file} /> : <p>Please choose a chapter</p>}
    </div>
  );
};

export default ChooseChapter;
