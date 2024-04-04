import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={478}
        viewBox="0 0 280 478"
        backgroundColor="#f3f3f3"
        foregroundColor="#b4acac"
        {...props}
    >
        <circle cx="140" cy="136" r="125" />
        <rect x="0" y="308" rx="10" ry="10" width="280" height="108" />
        <rect x="0" y="435" rx="10" ry="10" width="91" height="27" />
        <rect x="121" y="428" rx="10" ry="10" width="153" height="46" />
        <rect x="0" y="278" rx="10" ry="10" width="280" height="24" />
    </ContentLoader>
)

export default Skeleton;