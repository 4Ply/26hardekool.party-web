import React from 'react';
import {Parallax} from 'react-spring';


export default ({offset, hint, caption, first, second, secondLink, gradient, scrollTo, rightNavText, isLastItem}) => (
    <React.Fragment>
        <Parallax.Layer offset={offset} speed={0.2}>
            <div className="slopeBegin"/>
        </Parallax.Layer>

        <Parallax.Layer offset={offset} speed={-0.2}>
            <div className={`slopeEnd ${gradient}`}/>
        </Parallax.Layer>

        <Parallax.Layer className="text number" offset={offset} speed={0.3}>
            <span>{hint}</span>
        </Parallax.Layer>

        <Parallax.Layer className="text header" offset={offset} speed={0.4}>
            <span>
                <p style={{fontSize: 20}}>{caption}</p>

                <div className={`stripe ${gradient}`}/>
                <p className={"title"}>{first}</p>
                {(secondLink &&
                    <a href={secondLink}><p datatype="subtitle" className={(rightNavText ? "select" : "")}>{second}</p>
                    </a>) ||
                <p datatype="subtitle" className={(rightNavText ? "select" : "")}>{second}</p>
                }
          </span>
        </Parallax.Layer>

        <Parallax.Layer offset={offset} speed={0.4}>
            {(rightNavText && <div className="floater text words">{rightNavText}</div>) ||
            (isLastItem && <div></div>) ||
            <div className="floater right text header">
                &rarr;
            </div>
            }
        </Parallax.Layer>

        <Parallax.Layer offset={offset} speed={0.4}>
            {
                offset >= 1 &&
                <div className="floater left text header">
                    &larr;
                </div>
            }
        </Parallax.Layer>

    </React.Fragment>
);
