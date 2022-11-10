import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import './App.css';
import {Table} from "./components/Table/Table";
import {Oval} from "react-loader-spinner";

function App() {
  const [dataSource, setDataSource] = useState(Array.from({ length: 20 }));
  const [hasMore, setHasMore] = useState(true);
  const useFetch = (url:string) => {
    const [data, setData] = useState([]);

    useEffect(() => {
      if (!url) return;
      const fetchData = async () => {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      };

      fetchData();
    }, [url]);

    return {data};
  };
  const {data} = useFetch('http://localhost:3000/posts');
  console.log(data);
  const fetchMoreData = () => {
    if(dataSource.length < 44) {
      setTimeout(() => {
        setDataSource(dataSource.concat(data))
      }, 500);
    } else {
      setHasMore(false)
    }

  }

  return (
      <div className='App'>
        <p><b>Test Task</b></p>
        <div id="parentScroll">
        <InfiniteScroll
            dataLength={dataSource.length}
            next={fetchMoreData}
            hasMore
            loader={
          <Oval
                height={30}
                width={30}
                color="#fff"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#000"
                strokeWidth={2}
                strokeWidthSecondary={2}

            />
        }
            endMessage={<p>You are set!</p>}
            scrollableTarget="parentScroll"
        >
          <Table data={data}/>
        </InfiniteScroll>
      </div>
      </div>

  );
}

export default App;
