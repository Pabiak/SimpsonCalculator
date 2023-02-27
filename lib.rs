extern crate core;

use std::ops::Index;
use js_sys::{Uint32Array, Function, JsString};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    pub fn alert(s: &str);
    pub fn throw();
}

#[wasm_bindgen(catch)]
pub fn simpson(func: Function, a: f64, b: f64, n: u32) -> Result<f64, i64> {
    let h: f64 = (b - a) / (n as f64);
    let mut sum: f64 = 0f64;
    let mut x: Vec<f64> = Vec::new();

    x.push(a);

    for j in 1..n + 1 {
        x.push( a + h * (j as f64));
    }

    for j in 1..((n >> 1) + 1) {
        sum += func.call1(&JsValue::NULL, &JsValue::from_f64(x[(2 * j - 2) as usize])).ok().unwrap().as_f64().unwrap() +
            4.0 * func.call1(&JsValue::NULL, &JsValue::from_f64(x[(2 * j - 1) as usize])).ok().unwrap().as_f64().unwrap() +
            func.call1(&JsValue::NULL, &JsValue::from_f64(x[(2 * j) as usize])).ok().unwrap().as_f64().unwrap();
    }
    return Ok(sum * h / 3.0 );
}