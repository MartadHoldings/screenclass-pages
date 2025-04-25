import React from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Col, Row, Statistic } from "antd";
import CountUp from "react-countup";
import type { StatisticProps } from "antd";

/* eslint-disable @typescript-eslint/no-explicit-any */

const formatter: StatisticProps["formatter"] = (value) => (
  // <CountUp end={value as number} separator="," />

  <CountUp end={value as number} separator="," {...({} as any)} />
);

export default function Analyitics() {
  return (
    <Row gutter={10}>
      <Col span={8}>
        <Statistic
          title="Active"
          value={11.28}
          precision={2}
          valueStyle={{ color: "#3f8600" }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      </Col>
      <Col span={8}>
        <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          valueStyle={{ color: "#cf1322" }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Col>
      <Col span={8}>
        <Statistic title="Active Users" value={112893} formatter={formatter} />
      </Col>
    </Row>
  );
}
