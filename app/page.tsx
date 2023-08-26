'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [bookmarks, setBookmarks] = useState([]);
  const [filtered, setFiltered] = useState('');
  const [loading, setLoading] = useState(false);

  function filterByValue(array: any, string: any) {
    return array.filter((o: any) =>
      Object.keys(o).some((k) =>
        o[k].toLowerCase().includes(string.toLowerCase())
      )
    );
  }

  useEffect(() => {
    setLoading(true);
    fetch(
      'https://opensheet.elk.sh/1jonPSUsmPe5NZ9odeGyrgt8I32oViHkQ79XFVYyv2ZU/1'
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setBookmarks(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className='bookmarks'>
      <div>
        <input
          placeholder='Search Bookmark'
          className='searchInput'
          onChange={(e) => {
            setFiltered(e.target.value);
          }}
        />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className='bookmarkGrid'>
          {filterByValue(bookmarks, filtered).map((s: any) => {
            return (
              <div key={s.Link} className='bookmark'>
                {/* <a href={s.Link} target='_blank'>
                  <Image
                    src={s.Thumbnail}
                    alt='Bookmark Image'
                    width='350'
                    height='284'
                    style={{ objectFit: 'cover' }}
                  />
                </a> */}
                <div className='bookmarkTexts'>
                  <div className='bookmarkTitle'>{s.Title}</div>
                  <div className='bookmarkDescription'>{s.Description}</div>
                  <div className='bookmarkLink'>
                    <a href={s.Link} className='bookmarkButton' target='_blank'>
                      Open Website
                    </a>
                  </div>
                </div>
                <div className='bookmarkThumbnail'>
                  <Image
                    src={s.Thumbnail}
                    alt='Bookmark Image'
                    className='bookmarkImage'
                    width='200'
                    height='200'
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
