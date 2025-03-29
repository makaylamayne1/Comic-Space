import React, { useState } from "react";
import AWS from "aws-sdk";
import "../content.css";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [completed, setCompleted] = useState("");
  const [chapter, setChapter] = useState(0);  // Track the current chapter count
  const [image, setImage] = useState(null);

  const genres = [
 "art"
  ];
  const complete = ["completed", "uncompleted"];

  const username = localStorage.getItem("username");
  const safeUsername = encodeURIComponent(username).replace(/[^a-zA-Z0-9-_]/g, '');

  const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: "ca-central-1",
  });

  const fetchChapterCount = async (comicTitle) => {
    const params = {
      Bucket: "starbucketcomic",
      Prefix: `${safeUsername}/${comicTitle}/`, // Filter by the comic title
    };

    try {
      const data = await s3.listObjectsV2(params).promise();
      const chapters = data.Contents.map((content) => {
        const match = content.Key.match(/chapter-(\d+)\.pdf$/);
        return match ? parseInt(match[1], 10) : 0;
      });

      return Math.max(...chapters, 0);  // Returns the highest chapter number
    } catch (error) {
      console.error("Failed to fetch chapters:", error);
      return 0;  // Default to 0 if there's an error
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!file || !title || username == null) {
      alert("Please select a file and enter the title.");
      return;
    }

    const currentChapter = await fetchChapterCount(title);
    const newChapter = currentChapter + 1; // Increment to the next chapter
    const key = `${safeUsername}/${title}/chapter-${newChapter}.pdf`;
    const params = {
      Bucket: "starbucketcomic",
      Key: key,
      Body: file,
      Metadata: {
        title,
        genre,
        image: image ? image.name : "",  // Set the image name or empty string if no image
        completed,
        username: safeUsername,
        chapter: newChapter.toString(),
      },
    };

    try {
      await s3.upload(params).promise();
      console.log(`File uploaded successfully as chapter ${newChapter}!`);
  
      setChapter(newChapter);  // Update the UI to show the new chapter count
      alert(`Upload successful! Chapter ${newChapter} added.`);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed!");
    }
  };

  return (
    <div className="content-box p-4">
      <form
        className="d-flex flex-column align-items-center justify-content-center p-1"
        onSubmit={handleFormSubmit}
      >
        <h2>Upload Content</h2>
        <label>Choose a PDF file</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <label>Set a PNG cover image</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <label>Paper Title</label>
        <label>Put the exact name of the previous upload if this is a newer version of a comic</label>
        <input
          type="text"
          placeholder="Paper Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Genre</label>
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Type of comic</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <label>Completed?</label>
        <select
          value={completed}
          onChange={(e) => setCompleted(e.target.value)}
        >
          <option value="">Select if Completed</option>
          {complete.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {chapter > 0 && <p>Current Version Count: {chapter}</p>}
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Upload;
