import { supabase } from './supabase.js';

export const api = {
  // Systems
  async getSystems() {
    const { data, error } = await supabase
      .from('sistema')
      .select('*');
    
    if (error) throw error;
    return data;
  },

  async createSystem(system) {
    const { data, error } = await supabase
      .from('sistema')
      .insert([system])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteSystem(id) {
    const { error } = await supabase
      .from('sistema')
      .delete()
      .eq('siscodigo', id);
    
    if (error) throw error;
  },

  // Users
  async getUsers() {
    const { data, error } = await supabase
      .from('usuario')
      .select('*');
    
    if (error) throw error;
    return data;
  },

  async createUser(user) {
    const { data, error } = await supabase
      .from('usuario')
      .insert([user])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteUser(id) {
    const { error } = await supabase
      .from('usuario')
      .delete()
      .eq('usucodigo', id);
    
    if (error) throw error;
  },

  async login(username, password) {
    const { data, error } = await supabase
      .from('usuario')
      .select('*')
      .eq('usulogin', username)
      .eq('ususenha', password)
      .eq('usuativo', true)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Profiles
  async getProfiles() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*');
    
    if (error) throw error;
    return data;
  },

  async createProfile(profile) {
    const { data, error } = await supabase
      .from('profiles')
      .insert([profile])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteProfile(id) {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('codigo', id);
    
    if (error) throw error;
  }
};