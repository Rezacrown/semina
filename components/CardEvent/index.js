/* eslint-disable @next/next/no-img-element */
import React, {Suspense} from "react";
import CardTitle from "../CardTitle";
import Link from "next/link";
import { formatDate } from "../../utils/formatDate";
import SkeletonLoading from '../../utils/skeletonLoading';
import Skeleton from "react-loading-skeleton";


export default function CardEvent({ data, title, subTitle }) {



  return (
    <section className="grow-today">
      <div className="container">
        <CardTitle title={title} subTitle={subTitle} />
        <div className="mt-5 row gap">
          
          <Suspense fallback={<Skeleton count={50}/>}>
          {data.map((data, index) => (
            <div className="col-lg-3 col-md-6 col-12" key={index}>
              <div className="card-grow h-100">
                <span className="badge-pricing">
                  {data.tickets[0].price === 0
                    ? "free"
                    : `$${data.tickets[0].price}`}
                </span>
                <img
                  src={`${process.env.NEXT_PUBLIC_API}/${data.image.name}`}
                  alt="semina"
                />
                <Link href={`/detail/${data._id}`}>
                <div className="card-content">
                  <div className="card-title">{data.title}</div>
                  <div className="card-subtitle">{data.category.name}</div>
                  <div className="description">
                    {data.venueName}, {formatDate(data.date)}
                  </div>
                  
                </div>
                  </Link>
              </div> 
            </div>
          ))}
          </Suspense>

        </div>
      </div>
    </section>
  );
}
