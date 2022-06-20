import shimmer from "shimmer";
import { AttributeNames } from "./enum/AttributeNames";
import { getTracing } from "./commonTracing";
import api from "@opentelemetry/api";
import React from 'react';
import opentelemetry from "@opentelemetry/api";
const _parentSpanMap = new Map();
const self = this;
export const UserContext = React.createContext();

//  Make a copy of the original add function 
const originalUseEffect = React.useEffect;
const originalSetState = React.setState;
const react=React.Component;

export const useEffectMonkeyPatching = () => {
    //  Make a copy of the original add function 
    const originalUseEffect = React.useEffect;
    console.log("tracerUseEffect function called");
    React.useEffect = function (...args) {
        console.log("Tracking use effect called ");
        const parentSpan =_getParentSpan(
            React,
            AttributeNames.EFFECT_SPAN
          );
        const apply = _instrumentFunctionn(
            React.Component,
            AttributeNames.EFFECT_SPAN,
            parentSpan,
            () => {
              return originalUseEffect.apply(this, args);
            }
          );
      return apply;
    }

}

export const setStateMonkeyPatching = () => {
    //  Make a copy of the original add function 
    const originalSetState = React.setState;
    console.log("tracerUseEffect function called");
    React.useEffect = function (...args) {
        console.log("Set state tracing method called ");
        const tracer = getTracing("example-react-load", AttributeNames.REACT_STATE);
        tracer.end();

        return originalSetState.apply(React, args);
    }

}

/**
  * Creates a new span as a child of the current parent span.
  * If parent span is undefined, just the child is created.
  * @param react React component currently being instrumented
  * @param name Name of span
  * @param parentSpan parent span
  */
export const _createSpanWithParent = (
    react,
    name,
    parentSpan
) => {
    return opentelemetry.trace.getTracer("example-react-load").startSpan(
        name,
        {
            attributes: _getAttributes(react),
        },
        parentSpan
            ? api.trace.setSpan(api.context.active(), parentSpan)
            : undefined
    );
}

/**
 * Creates a new span
 * @param react React component currently being instrumented
 * @param name Name of span
 */
export const _createSpan = (react, name) => {
  
    return opentelemetry.trace.getTracer("example-react-load").startSpan(name, {
        attributes: _getAttributes(react),
    });
}

/**
 * Provides instrumentation for a function
 * @param react React component currently instrumenting.
 * @param spanName Name to set the span of the instrumented function to.
 * @param original Original function currently being wrapped.
 * @parentName Name to set parent span to on error.
 */
export const _instrumentFunctionn = (react, spanName, parent, original
) => {
    const span = _createSpanWithParent(react, spanName, parent);
    let wasError = false;
    try {
        return api.context.with(
            api.trace.setSpan(api.context.active(), span),
            () => {
                return original();
            }
        );
    } catch (err) {
     //   span.setAttribute(AttributeNames.REACT_ERROR, err.stack);
        wasError = true;
        throw err;
    } finally {
        span.end();
        if (wasError) {
       
        }
    }
}
  /**
   * This function returns a parent span. If the parent doesn't
   * exist, the function creates one
   * @param react React component parent span belongs to.
   */
   export const _getParentSpan=(react, parentName)=> {

    const parentSpan = _parentSpanMap.get(react);
    if (!parentSpan) {
      const span = _createSpan(react, parentName);
      _parentSpanMap.set(react, span);
    }
    return parentSpan;
  }

  


export const _getAttributes=(react)=> {
    let state;
    try {
      state = JSON.stringify(react.state);
    } catch {
      state = '{"message": "state could not be turned into string"}';
    }
    return {
      [AttributeNames.LOCATION_URL]: window.location.href,
      [AttributeNames.REACT_NAME]: react.constructor.name,
      [AttributeNames.REACT_STATE]: state,
    };
  }
