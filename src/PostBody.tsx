import styles from "./styles/styles.module.css";
interface PostBodyProps {
  alcohol: string;
  alcoholHit: string;
  origin: string;
  beerName: string;
  value: string;
  image: string;
  price: string;
  quality: string;
  rating: string;
  reviewBody: string;
  taste: string;
}
export const PostBody = ({
  alcohol,
  alcoholHit,
  beerName,
  image,
  rating,
  price,
  quality,
  taste,
  reviewBody,
  origin,
  value,
}: PostBodyProps) => {
  const progressBarArr = [
    { "удар по башке": alcoholHit },
    { доступность: price },
    { качество: quality },
    { вкус: taste },
  ];
  const tagsArr = [{ origin }, "aclPercent", "price"];
  // console.log("object", progressBarArr);
  return (
    <div className={styles.postBody}>
      <div className={styles.tags}>
        <h2 className={styles.beerName}>{beerName}</h2>
        <div className={styles.tag}>{origin}</div>
        <div className={styles.tag}>{alcohol}</div>
        <div className={styles.tag}>{value}</div>
      </div>

      {progressBarArr.map((item) => (
        <div key={Object.keys(item)[0]} className={styles.progressBar}>
          <span className={styles.progressBarName}>{Object.keys(item)[0]}</span>
          <span className={styles.Bar}>
            <span
              style={{ width: `${Object.values(item)[0] * 20}%` }}
              className={styles.progressBarFill}></span>
          </span>
        </div>
      ))}

      <div>
        <p>{reviewBody}</p>
      </div>
      <img className={styles.postImg} src={image} alt="" />
    </div>
  );
};
