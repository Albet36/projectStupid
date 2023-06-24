'use client'
import Image from 'next/image';
import { Space, Table, Tag, Select, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState, useEffect } from 'react';
import { listNewsApi } from './api/api';
import type { DatePickerProps } from 'antd';
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export default function Home() {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [listNews, setListNews] = useState<any>();
  const [filteredNews, setFilteredNews] = useState<any>([]);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'author',
      key: 'author',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      render: (text: string) => <h2>{text}</h2>,
    },
    {
      title: 'Date',
      dataIndex: 'publishedAt',
      key: 'publishedAt',
    },
  ];

  const getList = async () => {
    const res = await listNewsApi();
    setListNews(res?.data);
    setFilteredNews(res?.data);
  };

  useEffect(() => {
    getList();
  }, []);

  const handleStartDateChange = (date: any, dateString: any) => {
    setStartDate(dateString);
  };

  const handleEndDateChange = (date: any, dateString: any) => {
    setEndDate(dateString);
  };

  const handleChange = (value: string[]) => {
    setSelectedAuthors(value);
  };

  const filterData = () => {
    let filteredData = listNews;

    if (startDate && endDate) {
      const filteredDates = listNews?.articles?.filter((item: any) => {
        const publishedDate = new Date(item.publishedAt);
        return publishedDate >= new Date(startDate) && publishedDate <= new Date(endDate);
      });

      filteredData = { ...filteredData, articles: filteredDates };
    }

    if (selectedAuthors.length > 0) {
      const filteredAuthors = filteredData?.articles?.filter((item: any) =>
        selectedAuthors.includes(item.author)
      );
      filteredData = { ...filteredData, articles: filteredAuthors };
    }

    setFilteredNews(filteredData);
  };

  return (
    <>
      <div className='flex gap-2'>
        <Select
          mode='multiple'
          allowClear
          style={{ width: '50%' }}
          placeholder='Please select'
          onChange={handleChange}
          options={listNews?.articles?.map((item: any) => ({
            label: item?.author,
            value: item?.author,
          }))}
        />
        <DatePicker onChange={handleStartDateChange} placeholder='Select start date' />
        <DatePicker onChange={handleEndDateChange} placeholder='Select end date' />
        <button onClick={filterData}>Filter</button>
      </div>
      <Table columns={columns} dataSource={filteredNews?.articles} />
    </>
  );
}