import React from 'react';

const ArticleContent = (props) => {
    const HTMLComponent = ({ htmlContent }) => {
        return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
    };

    return (
        <div>
            <HTMLComponent htmlContent={props.articleContent} />
        </div>
    );
};

export default ArticleContent;
