'use client'

import { Skeleton, Flex } from 'antd';

export function HomeSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <Skeleton.Input active block style={{ height: 40, width: '40%' }} />
        <Skeleton.Input active block style={{ height: 30, width: '60%', marginTop: 8 }} />
      </div>

      <Skeleton.Button active block style={{ height: 100 }} />

      <Skeleton.Button active block style={{ height: 100 }} />

      <Flex gap={12}>
        <Skeleton.Button active block style={{ height: 100 }} />
        <Skeleton.Button active block style={{ height: 100 }} />
      </Flex>

      <div className="space-y-3">
        <Skeleton.Input active block style={{ height: 30,width: '30%' ,marginTop: 10 }} />

        {[1, 2, 3].map((i) => (
          <Skeleton.Button
            key={i}
            active
            block
            style={{ height: 140 }}
          />
        ))}
      </div>
    </div>
  );
}