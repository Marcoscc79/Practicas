from __future__ import annotations

import abc
from typing import (
    Any,
    Dict,
    Iterator,
    Tuple,
    Union,
)

ResType = Dict[int, Any]

def frame_apply(
    obj: DataFrame,
    func,
    axis=...,
    raw: bool = ...,
    result_type=...,
    ignore_failures: bool = ...,
    args=...,
    kwds=...,
): ...

class FrameApply(metaclass=abc.ABCMeta):
    axis: int
    @property
    @abc.abstractmethod
    def result_index(self) -> Index: ...
    @property
    @abc.abstractmethod
    def result_columns(self) -> Index: ...
    @property
    @abc.abstractmethod
    def series_generator(self) -> Iterator[Series]: ...
    @abc.abstractmethod
    def wrap_results_for_axis(
        self, results: ResType, res_index: Index
    ) -> Union[Series, DataFrame]: ...
    obj = ...
    raw = ...
    ignore_failures = ...
    args = ...
    kwds = ...
    result_type = ...
    f = ...
    def __init__(
        self,
        obj: DataFrame,
        func,
        raw: bool,
        result_type,
        ignore_failures: bool,
        args,
        kwds,
    ): ...
    @property
    def res_columns(self) -> Index: ...
    @property
    def columns(self) -> Index: ...
    @property
    def index(self) -> Index: ...
    def values(self): ...
    def dtypes(self) -> Series: ...
    @property
    def agg_axis(self) -> Index: ...
    def get_result(self): ...
    def apply_empty_result(self): ...
    def apply_raw(self): ...
    def apply_broadcast(self, target: DataFrame) -> DataFrame: ...
    def apply_standard(self): ...
    def apply_series_generator(self) -> Tuple[ResType, Index]: ...
    def wrap_results(
        self, results: ResType, res_index: Index
    ) -> Union[Series, DataFrame]: ...

class FrameRowApply(FrameApply):
    axis: int = ...
    def apply_broadcast(self, target: DataFrame) -> DataFrame: ...
    @property
    def series_generator(self): ...
    @property
    def result_index(self) -> Index: ...
    @property
    def result_columns(self) -> Index: ...
    def wrap_results_for_axis(
        self, results: ResType, res_index: Index
    ) -> DataFrame: ...

class FrameColumnApply(FrameApply):
    axis: int = ...
    def apply_broadcast(self, target: DataFrame) -> DataFrame: ...
    @property
    def series_generator(self): ...
    @property
    def result_index(self) -> Index: ...
    @property
    def result_columns(self) -> Index: ...
    def wrap_results_for_axis(
        self, results: ResType, res_index: Index
    ) -> Union[Series, DataFrame]: ...
    def infer_to_same_shape(self, results: ResType, res_index: Index) -> DataFrame: ...

from pandas.core.frame import DataFrame
from pandas.core.indexes.base import Index
from pandas.core.series import Series
