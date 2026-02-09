import { useState, useEffect, useCallback } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import type { Category } from '../types/entities';
import type { CategoryType } from '../services/categoryService';
import * as categoryService from '../services/categoryService';

export function useCategories(type?: CategoryType) {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = useCallback(async () => {
    if (!user?.id) {
      setCategories([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await categoryService.getCategoriesByUserId(user.id, type);
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id, type]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const createCategory = useCallback(
    async (input: categoryService.CreateCategoryInput) => {
      const id = await categoryService.createCategory(input);
      await fetchCategories();
      return id;
    },
    [fetchCategories],
  );

  const updateCategory = useCallback(
    async (categoryId: string, input: categoryService.UpdateCategoryInput) => {
      await categoryService.updateCategory(categoryId, input);
      await fetchCategories();
    },
    [fetchCategories],
  );

  const deleteCategory = useCallback(
    async (categoryId: string) => {
      await categoryService.deleteCategory(categoryId);
      await fetchCategories();
    },
    [fetchCategories],
  );

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
